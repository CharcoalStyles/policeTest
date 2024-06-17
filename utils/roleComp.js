export function progressionRoles(roles, currentRole) {
  const filteredRoles = roles
    .filter((role) => {
      return role.jobFunction === currentRole.jobFunction
    })
    .filter((role) => {
      // Only pick roles that are the next level up
      // Will need to fix this logic for roles that don't have numerical grades, by using salary
      if (
        currentRole.gradeId.type === 'policing' &&
        currentRole.gradeId.type === 'clerk'
      ) {
        let nextRoleJump = 1
        if (
          currentRole.gradeId.type === 'policing' &&
          currentRole.gradeId.grade === 2
        ) {
          nextRoleJump = 2
        }
        return role.gradeId.grade === currentRole.gradeId.grade + nextRoleJump
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
      // Filter out roles not in current Job Family
      return role.jobFamily === currentRole.jobFamily
    })
    .filter((role) => {
      // Filter out roles in current Job Function
      return role.jobFunction !== currentRole.jobFunction
    }).filter((role) => {
      // Only pick roles that are the next level up
      // Will need to fix this logic for roles that don't have numerical grades, by using salary
      if (
        currentRole.gradeId.type === 'policing' &&
        currentRole.gradeId.type === 'clerk'
      ) {
        return role.gradeId.grade === currentRole.gradeId.grade
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

export function skillRoles(currentRole) {
  return this.roles
    .filter((role) => role.jobFamily !== currentRole.jobFamily)
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
