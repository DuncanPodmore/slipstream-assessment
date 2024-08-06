export interface SuccessAlertProps {
  message: string;
  visible: boolean;
}

export default function SuccessAlert(props: SuccessAlertProps) {
  if (!props.visible) return <></>;

  return (
    <>
      {/* Alerts: Success */}
      <div className="rounded bg-emerald-100 p-4 text-emerald-700 md:p-5 dark:bg-emerald-900/75 dark:text-emerald-100">
        <div className="mb-2 flex items-center">
          <svg
            className="hi-solid hi-check-circle mr-3 inline-block size-5 flex-none text-emerald-500 dark:text-emerald-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className="font-semibold">{props.message}</h3>
        </div>
      </div>
      {/* END Alerts: Success */}
    </>
  );
}
