const isAssessible = (steps, id) => {
  const currentStep = steps.find(step => step.id === id)
  return 'assessible' in currentStep && currentStep.assessible === true
}

export default isAssessible
