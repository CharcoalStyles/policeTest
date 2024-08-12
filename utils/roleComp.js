import { shuffle } from '~/utils/array'

function commonFilters(roles, currentRole, goalRole, userInterests, answers) {
  return roles
    .filter((role) => {
      // remove current role from consideration
      if (role.id === currentRole.id) {
        return false
      }
      return true
    })
    .filter((role) => {
      // if there is a goal role, remove it from consideration
      if (goalRole && role.id === goalRole.id) {
        return false
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
      // filter out sworn roles
      if (answers && answers.hasOwnProperty('sworn')) {
        switch (answers.sworn.value) {
          case 'yes':
            return role.jobFamily === 'Policing'
          case 'no':
            return role.jobFamily !== 'Policing'
          default:
            return true
        }
      }
      return true
    })
    .filter((role) => {
      if (answers && answers.hasOwnProperty('detective-roles')) {
        if (role.grade.split(' ')[0] === 'Detective') {
          return answers['detective-roles'].value === 'yes'
        }
      }
      return true
    })
}

export function progressionRoles(
  roles,
  currentRole,
  goalRole,
  userInterests,
  answers
) {
  return commonFilters(roles, currentRole, goalRole, userInterests, answers)
    .filter((role) => {
      const currentRoleIsPolicingClerk =
        currentRole.gradeId.type === 'policing' ||
        currentRole.gradeId.type === 'clerk'
      const thisRoleIsPolicingClerk =
        role.gradeId.type === 'policing' || role.gradeId.type === 'clerk'
      const bothRolesHaveValidGrade =
        role.gradeId.grade !== -1 && currentRole.gradeId.grade !== -1

      if (
        currentRoleIsPolicingClerk &&
        thisRoleIsPolicingClerk &&
        bothRolesHaveValidGrade
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
}

export function adjacentRoles(
  roles,
  currentRole,
  goalRole,
  userInterests,
  answers
) {
  const filteredRoles = commonFilters(
    roles,
    currentRole,
    goalRole,
    userInterests,
    answers
  )
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
      // Only pick roles that are the same level for roles where we have that numerical ranking
      if (currentRole.gradeId.type === 'policing') {
        return role.gradeId.grade === currentRole.gradeId.grade
      }
      return true
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

export function skillRoles(
  roles,
  currentRole,
  goalRole,
  userInterests,
  answers
) {
  const filteredRoles = commonFilters(
    roles,
    currentRole,
    goalRole,
    userInterests,
    answers
  ).filter((role) => {
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
  return filteredRoles
}

/// type is type of reccomendation
/// 'progression', 'adjacent' or 'skill'
/// userInterests and answers are optional
export function rankAndSortRoles(
  currentRole,
  compareRoles,
  type,
  userInterests,
  answers
) {
  // console.group(type)
  // test logic for role volume
  // console.table(
  //   [10, 25, 50, 100, 250, 1000, 6000].map((salary) => ({
  //     salary,
  //     'salary 1.5 * minVol^0.1': 1.5 * Math.pow(salary, 0.1),
  //     'salary 1.5 * minVol^0.11': 1.5 * Math.pow(salary, 0.11)
  //   }))
  // )

  const partialResults = compareRoles
    .map((role) => {
      const rrBreakdown = {}
      // Capability comparison
      let roleRank = roleShareCapabilitiesRank(currentRole, role)
      rrBreakdown.capabilities = roleRank

      // Grade logic
      if (currentRole.gradeId.grade !== -1 && role.gradeId.grade !== -1) {
        const gradeDelta = currentRole.gradeId.grade - role.gradeId.grade

        if (gradeDelta === 0) {
          roleRank += 1
          rrBreakdown.gradeDelta = 1
        }

        if (gradeDelta === -1) {
          // next grade
          roleRank += 0.5
          rrBreakdown.gradeDelta = 0.5
        }

        if (gradeDelta > 0) {
          // next grade
          roleRank -= 0.5
          rrBreakdown.gradeDelta = -0.5
        }
      }

      // Interests comparison
      if (userInterests && userInterests.length > 0) {
        if (userInterests.includes(role.jobFunction.trim())) {
          switch (type) {
            case 'progression':
              roleRank += 4
              break
            case 'adjacent':
              roleRank += 9
              break
          }
        }
      }

      // Management preference
      if (answers && answers.hasOwnProperty('management')) {
        if (answers.management.value !== 'either') {
          const wantManager = answers.management.value === 'manager'
          const isManager = role.manager
          if (wantManager === isManager) {
            roleRank += 1
          }
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
        rrBreakdown.minVolume = 1.5 * Math.pow(minVolume, 0.11)
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
              rrBreakdown.salaryDiff = (diff / 2000) * -0.1
              break
            case 'adjacent':
              roleRank -= (diff / 2000) * 0.5
              rrBreakdown.salaryDiff = (diff / 2000) * -0.5
              break
            case 'skill':
              roleRank -= (diff / 2000) * 0.05
              rrBreakdown.salaryDiff = (diff / 2000) * -0.05
          }
        }
      }

      // bumps for Job Family and Job Function
      if (role.jobFamily === currentRole.jobFamily) {
        switch (type) {
          case 'progression':
            roleRank += 2
            rrBreakdown.jobFamily = 2
            break
          case 'adjacent':
            roleRank += 1
            rrBreakdown.jobFamily = 1
            break
          case 'skill':
            roleRank += 0.05
            rrBreakdown.jobFamily = 0.05
            break
        }
      }
      if (role.jobFunction === currentRole.jobFunction) {
        switch (type) {
          case 'progression':
            roleRank += 2
            rrBreakdown.jobFunction = 2
            break
          case 'adjacent':
            if (userInterests && userInterests.length === 0) {
              roleRank += 2
              rrBreakdown.jobFunction = 2
            }
            roleRank += 1
            rrBreakdown.jobFunction = 1
            break
          case 'skill':
            roleRank += 0.05
            rrBreakdown.jobFunction = 0.05
            break
        }
      }

      // bumps for command / unit
      if (role.command_BusUnit !== currentRole.command_BusUnit) {
        switch (type) {
          case 'progression':
            roleRank += 1
            rrBreakdown.command_BusUnit = 1
            break
          case 'adjacent':
            roleRank += 2.5
            rrBreakdown.command_BusUnit = 2.5
            break
          case 'skill':
            roleRank += 0.5
            rrBreakdown.command_BusUnit = 0.5
            break
        }
      }

      return {
        role,
        rank: roleRank,
        rrBreakdown
      }
    }, [])
    .sort((a, b) => {
      return b.rank - a.rank
    })
  // .map(({ role, rank, rrBreakdown }, i) => {
  //   if (i < 50) {
  //     console.log(role.name, rank, rrBreakdown)
  //   }
  //   return {
  //     role,
  //     rank
  //   }
  // })

  if (
    type === 'progression' &&
    currentRole.jobFamily === 'Policing' &&
    currentRole.gradeId.grade === 4
  ) {
    const inspectorRoles = partialResults.filter(
      (r) =>
        r.role.gradeId.grade === 5 &&
        r.rank > 0 &&
        r.role.jobFamily === 'Policing'
    )
    partialResults.unshift(...inspectorRoles.slice(0, 3))
  }

  const results = partialResults
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
  // console.groupEnd()
  return results
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
