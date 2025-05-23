import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

import Sets from "./Sets/Sets";
import SetForm from "./Sets/SetForm";

function RoutineDetails() {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: routine,
    loading,
    error,
  } = useQuery(`/routines/${id}`, "routine");

  const {
    mutate: deleteRoutine,
    loading: deleting,
    error: deleteError,
  } = useMutation("DELETE", `/routines/${id}`, ["routines", "routine"]);

  if (loading || !routine) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <>
      <h1>{routine.name}</h1>
      <p>by {routine.creatorName}</p>
      <p>{routine.goal}</p>
      {token && (
        <button
          onClick={async () => {
            try {
              const success = await deleteRoutine();
              if (success) navigate("/routines");
            } catch (e) {
              console.error("Delete Unsuccessful", e);
            }
          }}
        >
          {deleting ? "Deleting" : deleteError ? deleteError : "Delete"}
        </button>
      )}
      <Sets sets={routine.sets} />
      {token && <SetForm routineId={id} />}
    </>
  );
}

export default RoutineDetails;
