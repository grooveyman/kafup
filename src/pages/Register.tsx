import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApiMutation, useApiQuery } from "../hooks/useApi";
import { useLoginModal } from "../context/LoginModalContext";
import "./Register.css";

type CustomerDetails = {
  fullname: string;
  email: string;
  phoneNumber: string;
  deliveryAddress: string;
  region: string;
  city: string;
};

type CustomerRecord = Record<string, unknown>;
type EmailCheckResponse = {
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  contact?: string;
  deliveryAddress?: string;
  delivery_address?: string;
  region?: string;
  city?: string;
} | null;

type CreateCustomerPayload = {
  fullname: string;
  email: string;
  phoneNumber: string;
  deliveryAddress: string;
  region: string;
  city: string;
  password: string;
};

type CreateCustomerResponse = {
  message?: string;
} | null;

type RegistrationStep = "email" | "password" | "register";

const isRecord = (value: unknown): value is CustomerRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readCustomerString = (record: CustomerRecord, keys: string[]) => {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value;
    if (typeof value === "number") return String(value);
  }
  return "";
};

const getCustomerDetails = (response: unknown): CustomerDetails | null => {
  let record: CustomerRecord | null = isRecord(response) ? response : null;

  for (let depth = 0; record && depth < 3; depth += 1) {
    const nested = ["customer", "data", "user", "profile"]
      .map((key) => record?.[key])
      .find(isRecord);
    if (!nested) break;
    record = nested;
  }

  if (!record) return null;

  const firstName = readCustomerString(record, ["firstName", "first_name"]);
  const lastName = readCustomerString(record, ["lastName", "last_name"]);
  const details: CustomerDetails = {
    fullname:
      readCustomerString(record, ["fullname", "fullName", "full_name", "name"]) ||
      [firstName, lastName].filter(Boolean).join(" "),
    email: readCustomerString(record, ["email", "emailAddress", "email_address"]),
    phoneNumber: readCustomerString(record, [
      "phoneNumber",
      "phone_number",
      "contact",
      "phone",
    ]),
    deliveryAddress: readCustomerString(record, [
      "deliveryAddress",
      "delivery_address",
      "address",
    ]),
    region: readCustomerString(record, ["region", "regionName", "region_name"]),
    city: readCustomerString(record, ["city"]),
  };

  return Object.values(details).some(Boolean) ? details : null;
};

const regions = [
  "Ahafo",
  "Ashanti",
  "Bono",
  "Bono East",
  "Central",
  "Eastern",
  "Greater Accra",
  "North East",
  "Northern",
  "Oti",
  "Savannah",
  "Upper East",
  "Upper West",
  "Volta",
  "Western",
  "Western North",
];

const Register: React.FC = () => {
  const [step, setStep] = useState<RegistrationStep>("email");
  const [email, setEmail] = useState("");
  const [emailToCheck, setEmailToCheck] = useState("");
  const [emailCheckMessage, setEmailCheckMessage] = useState("");
  const [message, setMessage] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const { openLogin } = useLoginModal();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createCustomerMutation = useApiMutation<CreateCustomerResponse>(
    "/customer",
    "POST",
    {
    onSuccess: () => {
      navigate("/portal/orders");
      },
      onError: (error) => {
        setMessage(error.message || "Unable to save your account. Please try again.");
      },
    },
  );
  const [slidesHeight, setSlidesHeight] = useState(132);
  const emailStepRef = useRef<HTMLFormElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordStepRef = useRef<HTMLFormElement>(null);
  const registrationPasswordRef = useRef<HTMLInputElement>(null);
  const registrationStepRef = useRef<HTMLFormElement>(null);

  const {
    data: emailCheckData,
    isLoading,
  } = useApiQuery<EmailCheckResponse>(
    ["customer-email-check", emailToCheck],
    `/customer/check-email?email=${encodeURIComponent(emailToCheck)}`,
    {
      enabled: emailToCheck.length > 0,
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  console.log(isLoading? "Loading..." : emailCheckData);

  useEffect(() => {
    if (!emailToCheck || isLoading) return;

    if (emailCheckData === undefined) {
      setEmailCheckMessage("Unable to check this email. Please try again.");
      return;
    }

    if (emailCheckData === null) {
      setFullname("");
      setPhoneNumber("");
      setDeliveryAddress("");
      setRegion("");
      setCity("");
      setPassword("");
      setStep("register");
      return;
    }

    const customer = getCustomerDetails(emailCheckData);
    if (!customer) {
      setEmailCheckMessage(
        "We found a response for this email, but couldn't read the customer details. Please try again.",
      );
      return;
    }

    setFullname(customer.fullname);
    setEmail(customer.email || emailToCheck);
    setPhoneNumber(customer.phoneNumber);
    setDeliveryAddress(customer.deliveryAddress);
    setRegion(customer.region);
    setCity(customer.city);
    setPassword("");
    setEmailCheckMessage("");
    setStep("password");
  }, [emailCheckData, emailToCheck, isLoading]);

  useEffect(() => {
    if (step === "password") {
      passwordInputRef.current?.focus();
    } else if (step === "register") {
      registrationPasswordRef.current?.focus();
    }
  }, [step]);

  useLayoutEffect(() => {
    const activeStep = {
      email: emailStepRef.current,
      password: passwordStepRef.current,
      register: registrationStepRef.current,
    }[step];

    if (!activeStep) return;

    const updateSlidesHeight = () => {
      setSlidesHeight(activeStep.scrollHeight);
    };

    updateSlidesHeight();
    const observer = new ResizeObserver(updateSlidesHeight);
    observer.observe(activeStep);
    return () => observer.disconnect();
  }, [step]);

  const checkEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setEmailCheckMessage("");

    const normalizedEmail = email.trim();
    if (
      emailToCheck === normalizedEmail &&
      emailCheckData === undefined
    ) {
      void queryClient.refetchQueries({
        queryKey: ["customer-email-check", normalizedEmail],
        exact: true,
      });
    } else if (emailToCheck !== normalizedEmail) {
      setEmailToCheck(normalizedEmail);
    }
  };

  const changeEmail = () => {
    setEmailCheckMessage("");
    setMessage("");
    setEmailToCheck("");
    setFullname("");
    setPhoneNumber("");
    setDeliveryAddress("");
    setRegion("");
    setCity("");
    setPassword("");
    setStep("email");
  };

  const getCustomerPayload = (): CreateCustomerPayload => ({
      fullname: fullname.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      deliveryAddress: deliveryAddress.trim(),
      region,
      city: city.trim(),
      password,
  });

  const submitPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    createCustomerMutation.mutate(getCustomerPayload());
  };

  const submitRegistration = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    createCustomerMutation.mutate(getCustomerPayload());
  };

  const slideClass = (currentStep: RegistrationStep) => {
    if (step === currentStep) return "is-active";
    return step === "email" || currentStep === "register" ? "is-next" : "is-previous";
  };

  return (
    <main className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <section className="border rounded-4 bg-white p-4 p-md-5 shadow-sm">
            <div className="mb-4 text-center">
              <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light p-3 mb-3">
                <Mail size={24} aria-hidden="true" />
              </span>
              <h1 className="h3 mb-2">Create your account</h1>
              <p className="text-secondary mb-0">
                Enter your email to get started with Kafup.
              </p>
            </div>

            <div className="register-form-slides" style={{ height: slidesHeight }}>
              <form
                ref={emailStepRef}
                className={`register-form-step ${slideClass("email")}`}
                onSubmit={checkEmail}
                aria-hidden={step !== "email"}
              >
                <div className="mb-3">
                  <label htmlFor="register-email" className="form-label">
                    Email address
                  </label>
                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setEmailToCheck("");
                      setEmailCheckMessage("");
                    }}
                    required
                    disabled={step !== "email" || isLoading}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                      Checking email
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight size={16} className="ms-2" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>

              <form
                ref={passwordStepRef}
                className={`register-form-step ${slideClass("password")}`}
                onSubmit={submitPassword}
                aria-hidden={step !== "password"}
              >
                <div className="row g-3 mb-3" aria-label="Customer details">
                  <div className="col-12 col-md-6">
                    <label htmlFor="existing-customer-fullname" className="form-label">Full name</label>
                    <input
                      id="existing-customer-fullname"
                      className="form-control"
                      value={fullname}
                      readOnly
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="existing-customer-email" className="form-label">Email address</label>
                    <input
                      id="existing-customer-email"
                      className="form-control"
                      value={email}
                      readOnly
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="existing-customer-phone" className="form-label">Phone number</label>
                    <input
                      id="existing-customer-phone"
                      className="form-control"
                      value={phoneNumber}
                      readOnly
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="existing-customer-address" className="form-label">Delivery address</label>
                    <input
                      id="existing-customer-address"
                      className="form-control"
                      value={deliveryAddress}
                      readOnly
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="existing-customer-region" className="form-label">Region</label>
                    <input
                      id="existing-customer-region"
                      className="form-control"
                      value={region}
                      readOnly
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="existing-customer-city" className="form-label">City</label>
                    <input
                      id="existing-customer-city"
                      className="form-control"
                      value={city}
                      readOnly
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <label htmlFor="existing-customer-password" className="form-label mb-0">
                    Password
                  </label>
                  <button
                    type="button"
                    className="btn btn-link btn-sm p-0"
                    onClick={changeEmail}
                    disabled={step !== "password"}
                  >
                    <ArrowLeft size={14} className="me-1" aria-hidden="true" />
                    Change email
                  </button>
                </div>
                <input
                  ref={passwordInputRef}
                  id="existing-customer-password"
                  name="password"
                  type="password"
                  className="form-control mb-3"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setMessage("");
                  }}
                  required
                  disabled={step !== "password"}
                />
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={createCustomerMutation.isPending}
                >
                  {createCustomerMutation.isPending ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                      Saving account
                    </>
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>

              <form
                ref={registrationStepRef}
                className={`register-form-step ${slideClass("register")}`}
                onSubmit={submitRegistration}
                aria-hidden={step !== "register"}
              >
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <h2 className="h5 mb-1">Your details</h2>
                    <p className="small text-secondary mb-0">{email}</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-link btn-sm p-0"
                    onClick={changeEmail}
                    disabled={step !== "register"}
                  >
                    <ArrowLeft size={14} className="me-1" aria-hidden="true" />
                    Change email
                  </button>
                </div>

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="register-fullname" className="form-label">Full name</label>
                    <input
                      id="register-fullname"
                      className="form-control"
                      autoComplete="name"
                      value={fullname}
                      onChange={(event) => setFullname(event.target.value)}
                      required
                      disabled={step !== "register"}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="register-phone" className="form-label">Phone number</label>
                    <input
                      id="register-phone"
                      name="phoneNumber"
                      type="tel"
                      className="form-control"
                      autoComplete="tel"
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      required
                      disabled={step !== "register"}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="register-address" className="form-label">Delivery address</label>
                    <input
                      id="register-address"
                      className="form-control"
                      autoComplete="street-address"
                      value={deliveryAddress}
                      onChange={(event) => setDeliveryAddress(event.target.value)}
                      required
                      disabled={step !== "register"}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="register-region" className="form-label">Region</label>
                    <select
                      id="register-region"
                      className="form-select"
                      value={region}
                      onChange={(event) => setRegion(event.target.value)}
                      required
                      disabled={step !== "register"}
                    >
                      <option value="">Select your region</option>
                      {regions.map((regionName) => (
                        <option key={regionName} value={regionName}>
                          {regionName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="register-city" className="form-label">City</label>
                    <input
                      id="register-city"
                      className="form-control"
                      autoComplete="address-level2"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      required
                      disabled={step !== "register"}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="new-customer-password" className="form-label">Password</label>
                    <input
                      ref={registrationPasswordRef}
                      id="new-customer-password"
                      name="password"
                      type="password"
                      className="form-control"
                      autoComplete="new-password"
                      minLength={8}
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setMessage("");
                      }}
                      required
                      disabled={step !== "register"}
                    />
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={createCustomerMutation.isPending}
                    >
                      {createCustomerMutation.isPending ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                          Creating account
                        </>
                      ) : (
                        "Create account"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {emailCheckMessage && (
              <p className="alert alert-danger mt-2 mb-0" role="alert">
                {emailCheckMessage}
              </p>
            )}
            {message && (
              <p
                className={`alert ${createCustomerMutation.isError ? "alert-danger" : "alert-info"} mt-2 mb-0`}
                role={createCustomerMutation.isError ? "alert" : "status"}
              >
                {message}
              </p>
            )}

            <p className={`${message || emailCheckMessage ? "mt-2" : "mt-4"} mb-0 text-center text-secondary`}>
              Already have an account?{" "}
              <button
                type="button"
                className="btn btn-link p-0 align-baseline"
                onClick={openLogin}
              >
                Sign in
              </button>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Register;
