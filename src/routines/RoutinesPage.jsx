import { useAuth } from "../auth/AuthContext";

import RoutineList from "./RoutineList";
import RoutineForm from "./RoutineForm";

function RoutinesPage() {
  const { token } = useAuth();

  return (
    <>
      <h1>Routines</h1>
      <RoutineList />
      {token && <RoutineForm />}
    </>
  );
}

export default RoutinesPage;
