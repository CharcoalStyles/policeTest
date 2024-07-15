export function progressionRoles(roles, currentRole, interests) {
  const filteredRoles = roles
    .filter((role) => {
      // We'll never show the Student Police Officer role
      if (role.name === 'Student Police Officer') {
        return false
      }
      return true
    })
    .filter((role) => {
      if (interests.length > 0 && interests.includes(role.jobFunction)) {
        return true
      }

      return currentRole.jobFamily === role.jobFamily
    })
    .filter((role) => {
      // Only pick roles that are the next level up
      if (
        (currentRole.gradeId.type === 'policing' ||
          currentRole.gradeId.type === 'clerk') && (
          role.gradeId.type === 'policing' ||
          role.gradeId.type === 'clerk'
        ) && role.gradeId.grade !== -1 && currentRole.gradeId.grade !== -1
      ) {
        const nextRoleJump = 2

        // Policing specific rules
        if (currentRole.gradeId.type === 'policing') {
          // Sergeant & Senior Sergeant
          if (
            currentRole.gradeId.grade === 4
          ) {
            // Progression for Sergeants are Senior Sergeants and Inspectors
            // but since Senior Sergeants are the "same level" as Sergeants,
            // we need to check for that
            if (currentRole.grade === 'Sergeant' && role.grade === 'Senior Sergeant') {
              return true
            }
          }
        }

        if (role.gradeId.grade <= currentRole.gradeId.grade) {
          return false
        }

        return role.gradeId.grade <= currentRole.gradeId.grade + nextRoleJump
      }

      if (
        role.salary.min > currentRole.salary.min &&
        role.salary.max > currentRole.salary.max
      ) {
        return true
      }
    })

  return filteredRoles
}

export function adjacentRoles(roles, currentRole) {
  const filteredRoles = roles
    .filter((role) => {
      // Filter out roles not in current Job Family, if in Policing
      if (currentRole.jobFamily === 'Policing') {
        return role.jobFamily === currentRole.jobFamily
      }
      return true
    })
    .filter((role) => {
      return true
      // We'll never show the Student Police Officer role
      if (role.name === 'Student Police Officer') {
        return false
      }
    })
    .filter((role) => {
      // Only pick roles that are the next level up for roles where whe have that numerical ranking
      if (
        currentRole.gradeId.type === 'policing' ||
        currentRole.gradeId.type === 'clerk'
      ) {
        return role.gradeId.grade === currentRole.gradeId.grade
      }
    }).filter((role) => {
      if (currentRole.jobFamily === 'Policing') {
        return true
      }
      // Salary logic

      // If min salary is >5% less than current role's salary, then it's a no-go
      if (
        role.salary.min < currentRole.salary.min * 0.95
      ) {
        return false
      }

      if (
        Math.abs(role.salary.min - currentRole.salary.min) < 20000 &&
        Math.abs(role.salary.max - currentRole.salary.max) < 20000
      ) {
        return true
      }
    })

  return filteredRoles
}

export function skillRoles(roles, currentRole) {
  const filtered = roles
    .filter((role) => role.name !== 'Student Police Officer')
    .filter((role) => {
      // Salary logic

      // If min salary is >5% less than current role's salary, then it's a no-go
      if (
        role.salary.min < currentRole.salary.min * 0.95
      ) {
        return false
      }

      if (
        Math.abs(role.salary.min - currentRole.salary.min) < 20000 &&
        Math.abs(role.salary.max - currentRole.salary.max) < 20000
      ) {
        return true
      }
      return false
    })
  return filtered
}

export function rankAndSortRoles(currentRole, compareRoles) {
  return compareRoles
    .map((role) => {
      // Capability comparison
      const sharingSkills = roleShareCapabilitiesRank(
        currentRole,
        role
      )

      // Grade logic
      if (currentRole.gradeId.grade !== -1 && role.gradeId.grade !== -1) {
        const gradeDelta = currentRole.gradeId.grade - role.gradeId.grade

        if (gradeDelta === 0) {
          sharingSkills.focusFocus += 1
        }

        if (gradeDelta === -1) {
          // next grade
          sharingSkills.focusFocus += 0.5
        }

        if (gradeDelta > 0) {
          // next grade
          sharingSkills.focusFocus -= 0.5
        }
      }

      // command / unit
      if (currentRole.command_BusUnit !== role.command_BusUnit) {
        sharingSkills.focusFocus += 2.5
      }

      // role volume (number of positions)
      if (role.numPositions) {
        const minVolume = role.numPositions.split(' ')[1]
        sharingSkills.focusFocus += 1 + minVolume.length * 0.1
      }
      return {
        role,
        rank: sharingSkills
      }
    }, [])
    .sort((a, b) => {
      return b.rank.focusFocus - a.rank.focusFocus
    })
    .reduce((acc, rankedRole) => {
      const totalFocus = rankedRole.rank.focusFocus

      if (acc.length === 0) {
        acc.push([rankedRole])
      } else {
        const lastRank = acc[acc.length - 1]
        if (lastRank[0].rank.focusFocus === totalFocus) {
          acc[acc.length - 1].push(rankedRole)
        } else {
          acc.push([rankedRole])
        }
      }
      return acc
    }, [])
    .reduce((acc, rankedRoleGroup) => {
      const reRanked = rankedRoleGroup.sort((a, b) => {
        const aRank =
          a.rank.focusAll + a.rank.allFocus * 0.6 + a.rank.allAll * 0.1
        const bRank =
          b.rank.focusAll + b.rank.allFocus * 0.6 + b.rank.allAll * 0.1
        return bRank - aRank
      })
      reRanked.forEach((rankedRole) => {
        acc.push(rankedRole)
      })
      return acc
    }, [])
}

export function roleShareCapabilitiesRank(firstRole, secondRole) {
  const result = {
    focusFocus: 0,
    allFocus: 0,
    focusAll: 0,
    allAll: 0
  }

  firstRole.capabilities.all.forEach((firstCap) => {
    secondRole.capabilities.all.forEach((secondCap) => {
      if (firstCap.code === secondCap.code) {
        const firstFocus = firstRole.capabilities.focus
          .map(({ code }) => code)
          .includes(firstCap.code)
        const secondFocus = secondRole.capabilities.focus
          .map(({ code }) => code)
          .includes(secondCap.code)

        let resultKey = 'focusFocus'

        if (!firstFocus && secondFocus) {
          resultKey = 'allFocus'
        } else if (firstFocus && !secondFocus) {
          resultKey = 'focusAll'
        } else if (!firstFocus && !secondFocus) {
          resultKey = 'allAll'
        }

        const levelDelta = firstCap.level - secondCap.level

        if (levelDelta === 0) {
          // equal
          result[resultKey] += 1
        }

        if (levelDelta >= 1) {
          // FirstCap higher
          result[resultKey] += 1.2
          return
        }

        if (levelDelta === -1) {
          // FirstCap off by one
          result[resultKey] += 0.3
        }
      }
    })
  })

  return result
}
