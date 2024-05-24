// Check all values in array are true
const allConditionsMatch = value => value === true

const checkConditions = ({ conditions, steps, id }, answers) => {
  if (id === 'skills' || id === 'capabilities') {
    console.log('checkConditions - Skills', { conditions, steps, id, answers })
    if (!steps || steps.length < 1) {
      return false
    }
  }

  // No conditions so pass
  if (!conditions) {
    return true
  }

  console.log('checkConditions - Other', { conditions, steps, id, answers })
  // Check each condition against answers
  const checks = []
  conditions.forEach(condition => {
    const answerExists = condition.id in answers
    const conditionMatches = answerExists ? answers[condition.id].value === condition.value : false
    checks.push(conditionMatches)
  })

  return checks.every(allConditionsMatch)
}

export default checkConditions
