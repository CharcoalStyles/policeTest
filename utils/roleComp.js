import { shuffle } from '~/utils/array'

export function progressionRoles(roles, currentRole) {
  const filteredRoles = roles
    .filter((role) => role.id !== currentRole.id)
    .filter((role) => {
      // We'll never show the Student Police Officer role
      if (role.name === 'Student Police Officer') {
        return false
      }
      return true
    })
    .filter((role) => {
      // Only pick roles that are the next level up
      if (
        (currentRole.gradeId.type === 'policing' ||
          currentRole.gradeId.type === 'clerk') &&
        (role.gradeId.type === 'policing' || role.gradeId.type === 'clerk') &&
        role.gradeId.grade !== -1 &&
        currentRole.gradeId.grade !== -1
      ) {
        const nextRoleJump = 2

        // Policing specific rules
        if (currentRole.gradeId.type === 'policing') {
          // Sergeant & Senior Sergeant
          if (currentRole.gradeId.grade === 4) {
            // Progression for Sergeants are Senior Sergeants and Inspectors
            // but since Senior Sergeants are the "same level" as Sergeants,
            // we need to check for that
            if (
              currentRole.grade === 'Sergeant' &&
              role.grade === 'Senior Sergeant'
            ) {
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
    .filter((role) => role.id !== currentRole.id)
    .filter((role) => {
      // Filter out roles not in current Job Family, if in Policing
      if (currentRole.jobFamily === 'Policing') {
        return role.jobFamily === currentRole.jobFamily
      }
      return true
    })
    .filter((role) => {
      // We'll never show the Student Police Officer role
      if (role.name === 'Student Police Officer') {
        return false
      }
      return true
    })
    .filter((role) => {
      // Only pick roles that are the next level up for roles where whe have that numerical ranking
      if (
        currentRole.gradeId.type === 'policing' ||
        currentRole.gradeId.type === 'clerk'
      ) {
        return role.gradeId.grade === currentRole.gradeId.grade
      }
    })
    .filter((role) => {
      if (currentRole.jobFamily === 'Policing') {
        return true
      }
      // Salary logic

      // If min salary is >5% less than current role's salary, then it's a no-go
      if (role.salary.min < currentRole.salary.min * 0.95) {
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
    .filter((role) => role.id !== currentRole.id)
    .filter((role) => role.name !== 'Student Police Officer')
    .filter((role) => {
      // Salary logic

      // If min salary is >5% less than current role's salary, then it's a no-go
      if (role.salary.min < currentRole.salary.min * 0.95) {
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

export function rankAndSortRoles(
  currentRole,
  compareRoles,
  type
) {
  // type is type of reccomendation
  // 'progression' or 'adjacent'

  // test logic for role volume
  // console.table(
  //   [10, 25, 50, 100, 250, 1000, 6000].map((salary) => ({
  //     salary,
  //     'salary 1.5 * minVol^0.1': 1.5 * Math.pow(salary, 0.1),
  //     'salary 1.5 * minVol^0.11': 1.5 * Math.pow(salary, 0.11)
  //   }))
  // )

  // type is type of reccomendation
  // 'progression', 'adjacent' or 'skill'
  return compareRoles
    .map((role) => {
      // Capability comparison
      let roleRank = roleShareCapabilitiesRank(currentRole, role)

      // Grade logic
      if (currentRole.gradeId.grade !== -1 && role.gradeId.grade !== -1) {
        const gradeDelta = currentRole.gradeId.grade - role.gradeId.grade

        if (gradeDelta === 0) {
          roleRank += 1
        }

        if (gradeDelta === -1) {
          // next grade
          roleRank += 0.5
        }

        if (gradeDelta > 0) {
          // next grade
          roleRank -= 0.5
        }
      }

      // role volume (number of positions)
      if (role.numPositions) {
        const minVolume = role.numPositions.split(' ').reduce((acc, num) => {
          const n = Number.parseInt(num)
          if (Number.isNaN(n)) {
            return acc
          }
          if (n > acc) {
            return n
          }
          return acc
        }, -1)

        roleRank += 1.5 * Math.pow(minVolume, 0.11)
      }

      // salary logic
      if (
        role.jobFamily === 'Policing' &&
        currentRole.jobFamily === 'Policing'
      ) {
        if (role.salary.max > currentRole.salary.max) {
          const diff = role.salary.max - currentRole.salary.max
          switch (type) {
            case 'progression':
              roleRank -= (diff / 2000) * 0.1
              break
            case 'adjacent':
              roleRank -= (diff / 2000) * 0.5
              break
          }
        }
      }

      // bumps for Job Family and Job Function
      if (role.jobFamily === currentRole.jobFamily) {
        switch (type) {
          case 'progression':
            roleRank += 2
            break
          case 'adjacent':
            roleRank += 1
            break
        }
      }
      if (role.jobFunction === currentRole.jobFunction) {
        switch (type) {
          case 'progression':
            roleRank += 2
            break
          case 'adjacent':
            roleRank += 1
            break
        }
      }

      // bumps for command / unit
      if (role.command_BusUnit !== currentRole.command_BusUnit) {
        switch (type) {
          case 'progression':
            roleRank += 1
            break
          case 'adjacent':
            roleRank += 2.5
            break
        }
      }

      return {
        role,
        rank: roleRank
      }
    }, [])
    .sort((a, b) => {
      return b.rank - a.rank
    })
    .reduce(
      (acc, rankedRole, idx) => {
        if (currentRole.jobFamily !== 'Policing') {
          acc.roles.push(rankedRole)
          return acc
        }
        // if the current role is a Sergent / Senior Sergeant we want to have a minimum of 3 Inspectors
        if (currentRole.gradeId.grade === 4) {
          if (rankedRole.role.gradeId.grade === 5) {
            acc.counted += 1

            if (idx > 5 && acc.counted <= 3) {
              acc.roles = [rankedRole, ...acc.roles]
              return acc
            }
          }
        }
        acc.roles.push(rankedRole)
        return acc
      },
      { counted: 0, roles: [] }
    )
    .roles
    .reduce((acc, rankedRole) => {
      const totalFocus = rankedRole.rank

      if (acc.length === 0) {
        acc.push([rankedRole])
      } else {
        const lastRank = acc[acc.length - 1]
        if (lastRank[0].rank === totalFocus) {
          acc[acc.length - 1].push(rankedRole)
        } else {
          acc.push([rankedRole])
        }
      }
      return acc
    }, [])
    .reduce((acc, rankedRole) => {
      if (acc.find((x) => x[0].rank === rankedRole[0].rank)) {
        acc[acc.findIndex((x) => x[0].rank === rankedRole.rank)].push(
          rankedRole
        )
      } else {
        acc.push([rankedRole])
      }
      return acc
    }, [])
    .reduce((acc, rankedRoleGroup) => {
      shuffle(rankedRoleGroup)
      return [...acc, ...rankedRoleGroup.flat()]
    }, [])
}

export function roleShareCapabilitiesRank(firstRole, secondRole) {
  let result = 0

  firstRole.capabilities.all.forEach((firstCap) => {
    secondRole.capabilities.all.forEach((secondCap) => {
      if (firstCap.code === secondCap.code) {
        const firstFocus = firstRole.capabilities.focus
          .map(({ code }) => code)
          .includes(firstCap.code)
        const secondFocus = secondRole.capabilities.focus
          .map(({ code }) => code)
          .includes(secondCap.code)

        if (!(firstFocus && secondFocus)) {
          return
        }

        const levelDelta = firstCap.level - secondCap.level

        if (levelDelta === 0) {
          // equal
          result += 0.5
          return
        }

        if (levelDelta >= 1) {
          // FirstCap higher
          result += 0.6
          return
        }

        if (levelDelta === -1) {
          // FirstCap off by one
          result += 0.1
        }
      }
    })
  })

  // Remove 0.5 for capabilities that are only in the second role
  secondRole.capabilities.all.forEach((secondCap) => {
    if (
      !firstRole.capabilities.all.find(
        (firstCap) => firstCap.code === secondCap.code
      )
    ) {
      result -= 0.5
    }
  })

  return result
}
