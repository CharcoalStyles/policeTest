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
    .filter((role) => {
      // Filter out roles not in current Job Family, if in Policing
      if (currentRole.jobFamily === 'Policing') {
        return role.jobFamily === currentRole.jobFamily
      }
      return true
    })
    .filter((role) => {
      // Only pick roles that are the same level for roles where we have that numerical ranking
      if (currentRole.gradeId.type === 'policing' || currentRole.gradeId.type === 'clerk') {
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
      const { result, breakdown } = roleShareCapabilitiesRank(currentRole, role)
      let roleRank = result
      rrBreakdown.capabilities = breakdown

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
              roleRank += 5.5
              rrBreakdown.Interests = 5.5
              break
            case 'adjacent':
              roleRank += 7
              rrBreakdown.Interests = 7
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

        const rankAdj = 1.5 * Math.pow(minVolume, 0.11)

        roleRank += rankAdj
        rrBreakdown.positions = rankAdj
      }

      // salary logic
      if (role.jobFamily !== 'Policing') {
        if (role.salary.max > currentRole.salary.max) {
          const diff = role.salary.max - currentRole.salary.max
          let rankAdj = 0
          switch (type) {
            case 'progression':
              rankAdj = (diff / 2000) * -0.1
              break
            case 'adjacent':
              rankAdj = (diff / 2000) * -0.5
              break
            case 'skill':
              rankAdj = (diff / 2000) * -0.05
          }
          roleRank += rankAdj
          rrBreakdown.salaryDiff = rankAdj
        }
      }

      // bumps for Job Family and Job Function
      if (role.jobFamily === currentRole.jobFamily) {
        let rankAdj = 0
        switch (type) {
          case 'progression':
            rankAdj = 2
            break
          case 'adjacent':
            rankAdj = 1
            break
          case 'skill':
            rankAdj = 0.05
            break
        }
        roleRank += rankAdj
        rrBreakdown.jobFamily = rankAdj
      }

      if (role.jobFunction === currentRole.jobFunction) {
        let rankAdj = 0
        switch (type) {
          case 'progression':
            rankAdj = 2
            break
          case 'adjacent':
            if (userInterests && userInterests.length > 0) {
              rankAdj = 1.5
            } else {
              rankAdj = 2
            }
            break
          case 'skill':
            rankAdj = 0.05
            break
        }
        roleRank += rankAdj
        rrBreakdown.jobFunction = rankAdj
      }

      // bumps for command / unit
      if (role.command_BusUnit === currentRole.command_BusUnit) {
        let rankAdj = 0
        switch (type) {
          case 'progression':
            rankAdj = 1
            break
          case 'adjacent':
            rankAdj = 1.5
            break
          case 'skill':
            rankAdj = 0.5
            break
        }
        roleRank += rankAdj
        rrBreakdown.command_BusUnit = rankAdj
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

  const showLogs = ['careerpathfinderdev', 'localhost'].includes(window.location.hostname.split('.')[0])

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

    inspectorRoles.forEach((role) => {
      partialResults.splice(partialResults.findIndex((r) => r.role.id === role.role.id), 1)
    })
    showLogs && console.log('Inspector Roles', inspectorRoles.slice(0, 10).map(({ role, rank, rrBreakdown }) => ({ role: role.name, rank, rrBreakdown, minV: role.numPositions })))

    partialResults.unshift(...inspectorRoles.slice(0, 3))
  }

  showLogs && console.log(`${type} Roles`, currentRole, partialResults.slice(0, 20).map(({ role, rank, rrBreakdown }) => ({ roleName: role.name, rank, rrBreakdown, minV: role.numPositions, role })))

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

  const breakdown = {}
  firstRole.capabilities.focus.forEach((firstCap) => {
    secondRole.capabilities.focus.forEach((secondCap) => {
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
        let rankAdj = 0

        if (levelDelta === 0) {
          // equal
          rankAdj += 0.5
          return
        }

        if (levelDelta >= 1) {
          // FirstCap higher
          rankAdj += 0.6
          return
        }

        if (levelDelta === -1) {
          // FirstCap off by one
          rankAdj += 0.1
        }

        breakdown[firstCap.code] = rankAdj
        result += rankAdj
      }
    })
  })

  secondRole.capabilities.focus.forEach((cap) => {
    if (!firstRole.capabilities.focus.find(
      (firstCap) => firstCap.code === cap.code
    )) {
      result -= 0.5
      breakdown[cap.code] = -0.5
    }
  })

  return { result, breakdown }
}
