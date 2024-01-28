import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <>
      <Button
        style={{ position: "fixed", top: "50%", left: "50%" }}
        variant="primary"
        disabled
      >
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
      </Button>
    </>
  );
}

export default Loading;
