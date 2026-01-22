type ErrorProps = {
  error?: string;
};

export function ErrorComponent({ error }: ErrorProps) {
  return <p className="error">{error ? error : "Error"}</p>;
}
