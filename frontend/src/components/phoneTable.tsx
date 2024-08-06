import { PhoneNumber } from "../data/models/Client";
import React, { useEffect, useState } from "react";
import Dropdown from "./dropdown";

interface PhoneTableProps {
  phoneNumbers: PhoneNumber[];
  onAddPhoneNumber?: (n: PhoneNumber) => void;
  onUpdatePhoneNumber?: (n: PhoneNumber) => void;
  viewOnly?: boolean;
}

const PhoneTable: React.FC<PhoneTableProps> = ({
  phoneNumbers,
  onAddPhoneNumber,
  onUpdatePhoneNumber,
  viewOnly = false,
}) => {
  const headerClasses =
    "bg-gray-100/75 px-3 py-4 text-left font-semibold text-gray-900 dark:bg-gray-700/25 dark:text-gray-50";
  const cellClasses = "p-3";
  const buttonClasses =
    "inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300/25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600/40 dark:active:border-gray-700";

  const [newPhoneNumber, setNewPhoneNumber] = useState<PhoneNumber>({
    id: 0,
    number: "",
    type: "Cell",
  });
  const [updating, setUpdating] = useState(false);

  return (
    <div>
      <div className="min-w-full overflow-x-auto rounded border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <table className="min-w-full whitespace-nowrap align-middle text-sm">
          <thead>
            <tr>
              <th className={headerClasses}>Number</th>
              <th className={headerClasses}>Type</th>
              <th className={`${headerClasses} text-center`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {phoneNumbers.map(
              (phoneNumber, index) =>
                (phoneNumber.id !== newPhoneNumber.id ||
                  phoneNumber.id === 0) && (
                  <tr
                    key={index}
                    className="even:bg-gray-50 dark:even:bg-gray-900/50"
                  >
                    <td className={cellClasses}>
                      <p className="font-medium">{phoneNumber.number}</p>
                    </td>
                    <td
                      className={`${cellClasses} text-gray-500 dark:text-gray-400`}
                    >
                      {phoneNumber.type}
                    </td>
                    <td className={`${cellClasses} text-center`}>
                      {phoneNumber.id !== 0 && !viewOnly && (
                        <button
                          type="button"
                          className={buttonClasses}
                          onClick={() => {
                            setUpdating(true);
                            setNewPhoneNumber({
                              id: phoneNumber.id,
                              number: phoneNumber.number,
                              type: phoneNumber.type,
                            });
                          }}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ),
            )}
            <tr></tr>
            {!viewOnly && (
              <tr className="even:bg-gray-50 dark:even:bg-gray-900/50">
                <td className={cellClasses}>
                  <input
                    style={{
                      width: "150px",
                    }}
                    type="text"
                    value={newPhoneNumber.number}
                    onChange={(e) => {
                      e.preventDefault();
                      let updatedNumber: PhoneNumber = {
                        id: newPhoneNumber.id,
                        number: newPhoneNumber.number,
                        type: newPhoneNumber.type,
                      };
                      updatedNumber.number = e.target.value;
                      setNewPhoneNumber(updatedNumber);
                    }}
                    placeholder="Enter your name"
                    className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm leading-5 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                  />
                </td>
                <td
                  className={`${cellClasses} text-gray-500 dark:text-gray-400`}
                >
                  <form className="space-y-6 dark:text-gray-100">
                    <div className="space-y-1">
                      <select
                        id="select"
                        name="select"
                        style={{
                          width: "85px",
                        }}
                        className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-blue-500"
                        value={newPhoneNumber.type}
                        onChange={(e) => {
                          e.preventDefault();
                          let updatedType: PhoneNumber = {
                            id: newPhoneNumber.id,
                            number: newPhoneNumber.number,
                            type: newPhoneNumber.type,
                          };
                          // @ts-ignore
                          updatedType.type = e.target.value;
                          setNewPhoneNumber(updatedType);
                        }}
                      >
                        <option value={"Cell"}>Cell</option>
                        <option value={"Work"}>Work</option>
                      </select>
                    </div>
                  </form>
                </td>
                <td className={`${cellClasses} text-center`}></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mb-5 mt-5 flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div className="flex items-center justify-center gap-2">
          {!viewOnly && (
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-700 px-3 py-2 text-sm font-semibold leading-5 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400/50 active:border-blue-700 active:bg-blue-700 dark:focus:ring-blue-400/90"
              onClick={() => {
                if (!newPhoneNumber.number) return;
                if (updating && onUpdatePhoneNumber) {
                  onUpdatePhoneNumber(newPhoneNumber);
                } else {
                  if (onAddPhoneNumber) onAddPhoneNumber(newPhoneNumber);
                }
                setNewPhoneNumber({
                  id: 0,
                  number: "",
                  type: newPhoneNumber.type,
                });
                setUpdating(false);
              }}
            >
              {updating ? "Update " : "Add "} New Number
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneTable;
