import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

function ActivityDetails() {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: activity,
    loading,
    error,
  } = useQuery(`/activities/${id}`, "activity");

  const {
    mutate: deleteActivity,
    loading: deleting,
    error: deleteError,
  } = useMutation("DELETE", `/activities/${id}`, ["activities", "activity"]);

  if (loading || !activity) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <>
      <h1>{activity.name}</h1>
      <p>{activity.creatorName}</p>
      <p>{activity.description}</p>
      {token && (
        <button
          onClick={async () => {
            try {
              const success = await deleteActivity();
              if (success) navigate("/activities");
            } catch (e) {
              console.error("Delete Unsuccessful", e);
            }
          }}
        >
          {deleting ? "Deleting" : deleteError ? deleteError : "Delete"}
        </button>
      )}
    </>
  );
}

export default ActivityDetails;
