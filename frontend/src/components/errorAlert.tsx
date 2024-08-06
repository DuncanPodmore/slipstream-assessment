export interface ErrorAlertProps {
  errors: string[];
  visible: boolean;
}

export default function ErrorAlert(props: ErrorAlertProps) {
  if (!props.visible) return <></>;

  return (
    <>
      <div className="rounded bg-red-100 p-4 text-red-700 md:p-5 dark:bg-red-900/75 dark:text-red-100">
        <div className="mb-3 flex items-center">
          <svg
            className="hi-solid hi-x-circle mr-3 inline-block size-5 flex-none text-red-500 dark:text-red-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className="font-semibold">Please fix the following errors:</h3>
        </div>
        <ul className="ml-8 list-inside space-y-2">
          {props.errors.map((error, index) => (
            <li className="flex items-center" key={index}>
              <svg
                className="hi-solid hi-arrow-narrow-right mr-2 inline-block size-4 flex-none"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
