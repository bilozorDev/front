"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { z } from "zod";

const personSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
});

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.map((err) => err.message).join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export default function AddClientDrawer({
  openAddClientDrawer,
  setOpenAddClientDrawer,
}: {
  openAddClientDrawer: boolean;
  setOpenAddClientDrawer: (open: boolean) => void;
}) {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    validators: {
      onChange: personSchema,
    },

    onSubmit: console.log,
  });
  const handleClose = () => {
    setOpenAddClientDrawer(false);
  };

  return (
    <Dialog
      open={openAddClientDrawer}
      onClose={handleClose}
      className="relative z-50"
    >
      <div className="fixed inset-0" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <form
                className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
              >
                <div className="h-0 flex-1 overflow-y-auto">
                  <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-base font-semibold text-white">
                        New Client
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={handleClose}
                          className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-indigo-300">
                        Get started by filling in the information below to
                        create your new client.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="divide-y divide-gray-200 px-4 sm:px-6">
                      <div className="space-y-6 pb-5 pt-6">
                        <div>
                          <label
                            htmlFor="project-name"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Client name
                          </label>
                          <div className="mt-2">
                            <form.Field name="name">
                              {({ state, handleChange, handleBlur }) => (
                                <input
                                  value={state.value}
                                  onChange={(e) => handleChange(e.target.value)}
                                  onBlur={handleBlur}
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              )}
                            </form.Field>
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <div className="mt-2">
                            <form.Field
                              name="email"
                              validators={{
                                onChangeAsyncDebounceMs: 1000,
                                onChangeAsync: z
                                  .string()
                                  .email()
                                  .refine(async (value) => {
                                    const client =
                                      await getClientByEmail(value);
                                    if (client.data) {
                                      return `Email ${value} already exists`;
                                    }
                                    return undefined;
                                  }),
                              }}
                            >
                              {(field) => (
                                <>
                                  <label
                                    htmlFor="client-email"
                                    className="block text-sm/6 font-medium text-gray-900"
                                  >
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    value={field.state.value}
                                    onChange={(e) =>
                                      field.handleChange(e.target.value)
                                    }
                                    onBlur={field.handleBlur}
                                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
                                      field.state.meta.isTouched &&
                                      field.state.meta.errors.length
                                        ? "outline-red-500 outline-2"
                                        : ""
                                    }`}
                                  />
                                  <FieldInfo field={field} />
                                  {/* {field.state.meta.isTouched &&
                                  field.state.meta.isValidating &&
                                  isValidEmail(field.state.value) ? (
                                    <span className="text-indigo-500">
                                      Checking if {field.state.value} is
                                      available...
                                    </span>
                                  ) : field.state.meta.isTouched &&
                                    field.state.meta.errors.length ? (
                                    <span className="text-red-500">
                                      {JSON.stringify(field.state.meta.errors)}
                                    </span>
                                  ) : null} */}
                                </>
                              )}
                            </form.Field>
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="client-phone"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Phone
                          </label>
                          <div className="mt-2">
                            <form.Field name="phone">
                              {({ state, handleChange, handleBlur }) => (
                                <input
                                  id="client-phone"
                                  name="client-phone"
                                  type="tel"
                                  value={state.value}
                                  onChange={(e) => handleChange(e.target.value)}
                                  onBlur={handleBlur}
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              )}
                            </form.Field>
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="client-address"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Address
                          </label>
                          <div className="mt-2">
                            <form.Field name="address">
                              {({ state, handleChange, handleBlur }) => (
                                <input
                                  id="client-address"
                                  name="client-address"
                                  type="text"
                                  value={state.value}
                                  onChange={(e) => handleChange(e.target.value)}
                                  onBlur={handleBlur}
                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                              )}
                            </form.Field>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 justify-end px-4 py-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                  >
                    {([canSubmit, isSubmitting]) => (
                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {isSubmitting ? "..." : "Add"}
                      </button>
                    )}
                  </form.Subscribe>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
