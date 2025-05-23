import useMutation from "../../api/useMutation";
import useQuery from "../../api/useQuery";

function SetForm({ routineId }) {
  const {
    data: activities,
    loading: loadingActivities,
    error: activitiesError,
  } = useQuery("/activities", "activities");

  const {
    mutate: addSet,
    loading,
    error,
  } = useMutation("POST", "/sets", ["routines", "routine"]);

  if (loadingActivities) return <p>Loading activities...</p>;
  if (activitiesError || !activities) return <p>Sorry! {activitiesError}</p>;

  const addNewSet = async (formData) => {
    const activityId = formData.get("activity");
    const count = formData.get("count");
    await addSet({ activityId, routineId, count });
  };

  return (
    <>
      <h2>Add a set</h2>
      <form action={addNewSet}>
        <label>
          Activity
          <select name="activity" required>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Count
          <input type="number" name="count" min="1" required />
        </label>
        <button>{loading ? "Adding..." : "Add Set"}</button>
        {error && <output>{error}</output>}
      </form>
    </>
  );
}

export default SetForm;
