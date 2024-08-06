import { ApiService } from "../data/apiService";
import ErrorAlert from "../components/errorAlert";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Client, PhoneNumber, Address } from "../data/models/Client";
import PhoneTable from "../components/phoneTable";
import AddressTable from "../components/addressTable";

export const Route = createLazyFileRoute("/addClient")({
  component: AddClient,
});

function AddClient() {
  const apiService = new ApiService();
  const { id } = Route.useSearch<{ id?: number }>();
  let [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);

  const [errors, setErrors] = useState<string[]>([]);

  const submitForm = async () => {
    let newErrors = [];

    if (!firstName) {
      newErrors.push("First Name is required.");
    }

    if (!lastName) {
      newErrors.push("Last Name is required.");
    }

    if (!gender) {
      newErrors.push("Gender is required.");
    }

    if (!phoneNumbers) {
      newErrors.push("Registration Number is required.");
    }

    if (!dateOfBirth) {
      newErrors.push("Birth Date is required.");
    }

    if (phoneNumbers.length === 0) {
      newErrors.push("At least one Phone Number is required.");
    }

    if (addresses.length === 0) {
      newErrors.push("At least one Address is required.");
    }

    if (newErrors.length === 0) {
      const newClient: Client = {
        id: id ?? 0,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        phoneNumbers: phoneNumbers,
        addresses: addresses,
        dateOfBirth: dateOfBirth,
      };
      if (id) {
        const res = await apiService.editClient(newClient);
        console.log(res);
        if (res === null) {
          newErrors.push("Error editing client.");
        } else {
          window.location.href = "/?updated=true";
        }
      } else {
        const res = await apiService.addClient(newClient);
        console.log(res);
        if (res === null) {
          newErrors.push("Error adding client.");
        } else {
          window.location.href = "/?added=true";
        }
      }
    }

    setErrors(newErrors);
  };

  const getClientData = async () => {
    setLoading(true);
    const clientData = await apiService.getClient(id ?? 0);
    setFirstName(clientData?.firstName ?? "");
    setLastName(clientData?.lastName ?? "");
    setGender(clientData?.gender ?? "");
    setDateOfBirth(clientData?.dateOfBirth ?? new Date());
    setPhoneNumbers(clientData?.phoneNumbers ?? []);
    setAddresses(clientData?.addresses ?? []);

    if (!clientData) {
      setErrors([
        "Error loading the client. Make sure that the server is running.",
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getClientData();
    }
  }, []);

  if (loading) {
    return (
      <div className="p-2">
        <main id="page-content" className="flex max-w-full flex-auto flex-col">
          <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl">
            <h2>Content Loading...</h2>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 lg:space-y-8 dark:text-gray-100">
        <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100">
          <div className="grow justify-center p-5 md:flex lg:p-8">
            <div className="md:w-2/3 md:pl-24">
              <form className="space-y-6 xl:w-2/3">
                <div className="space-y-1">
                  <h1 className="font-semibold">Client Details</h1>
                </div>
                <div className="space-y-1">
                  <label htmlFor="firstName" className="font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="lastName" className="font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <div className="space-y-2">
                    <div className="font-medium">Gender</div>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          id="gender1"
                          onChange={() => setGender("male")}
                          checked={gender === "male"}
                          name="group_radio"
                          className="size-4 border border-gray-200 text-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-900 dark:checked:border-transparent dark:checked:bg-blue-500 dark:focus:border-blue-500"
                        />
                        <span className="ml-2">Male</span>
                      </label>
                      <label className="ml-6 inline-flex items-center">
                        <input
                          type="radio"
                          id="gender2"
                          onChange={() => setGender("female")}
                          checked={gender === "female"}
                          name="group_radio"
                          className="size-4 border border-gray-200 text-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-900 dark:checked:border-transparent dark:checked:bg-blue-500 dark:focus:border-blue-500"
                        />
                        <span className="ml-2">Female</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="regNo" className="font-medium">
                    Phone Numbers
                  </label>
                  <PhoneTable
                    phoneNumbers={phoneNumbers}
                    onAddPhoneNumber={(n) => {
                      let newPhoneNumbers = phoneNumbers;
                      newPhoneNumbers.push(n);
                      setPhoneNumbers(newPhoneNumbers);
                    }}
                    onUpdatePhoneNumber={(n) => {
                      let newPhoneNumbers = phoneNumbers;
                      const updatedPhoneNumber = newPhoneNumbers.filter(
                        (npn) => npn.id === n.id,
                      )[0];
                      updatedPhoneNumber.id = n.id;
                      updatedPhoneNumber.number = n.number;
                      updatedPhoneNumber.type = n.type;
                      setPhoneNumbers(newPhoneNumbers);
                    }}
                  />
                  <AddressTable
                    addresses={addresses}
                    onAddAddress={(a) => {
                      let newAddresses = addresses;
                      newAddresses.push(a);
                      setAddresses(newAddresses);
                    }}
                    onUpdateAddress={(a) => {
                      let newAddresses = addresses;
                      const updatedAddress = newAddresses.filter(
                        (npn) => npn.id === a.id,
                      )[0];
                      updatedAddress.id = a.id;
                      updatedAddress.details = a.details;
                      updatedAddress.type = a.type;
                      updatedAddress.clientId = a.clientId;
                      setAddresses(newAddresses);
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="bDate" className="font-medium">
                    Date of Birth
                  </label>
                  <div>
                    <DatePicker
                      selected={dateOfBirth}
                      onChange={(date) => setDateOfBirth(date ?? new Date())}
                      className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-700 px-3 py-2 text-sm font-semibold leading-5 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400/50 active:border-blue-700 active:bg-blue-700 dark:focus:ring-blue-400/90"
                  onClick={submitForm}
                >
                  {id ? "Update" : "Add"} Client
                </button>
              </form>
            </div>
          </div>
          <ErrorAlert visible={errors.length > 0} errors={errors} />
        </div>
      </div>
    </>
  );
}
