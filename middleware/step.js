export default function ({ redirect, store }) {
  const firstStep = store.state.pathway.steps[0]
  redirect(`/pathway/${firstStep.id}`)
}
