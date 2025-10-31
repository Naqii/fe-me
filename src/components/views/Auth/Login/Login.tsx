import { Button, Card, CardBody, cn, Input, Spinner } from "@heroui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useLogin from "./useLogin";
import { Controller } from "react-hook-form";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();

  return (
    <div className="flex w-full items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Wrapper Card */}
      <div className="flex w-full max-w-4xl flex-col rounded-xl lg:flex-row lg:gap-0">
        {/* Left Side - Background Hijau */}
        <div className="hidden bg-[#006d63] p-8 text-white lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center">
          <h1 className="text-3xl font-bold">Selamat Datang!</h1>
          <p className="mt-2 text-center text-base text-gray-100">
            Masuk ke akunmu untuk melanjutkan
          </p>
        </div>

        {/* Right Side - Form Login */}
        <Card className="flex w-full rounded-none border-0 lg:w-1/2 lg:rounded-r-xl">
          <CardBody className="p-6 sm:p-8">
            <h2 className="mb-6 text-center text-2xl font-bold text-[#006d63] sm:text-3xl lg:text-left">
              Login
            </h2>

            {errors.root && (
              <p className="mb-4 text-center text-sm font-medium text-red-500 lg:text-left">
                {errors?.root?.message}
              </p>
            )}

            <form
              className={cn(
                "flex flex-col",
                Object.keys(errors).length > 0 ? "gap-3" : "gap-5",
              )}
              onSubmit={handleSubmit(handleLogin)}
            >
              <Controller
                name="identifier"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Email / Username"
                    type="text"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.identifier !== undefined}
                    errorMessage={errors.identifier?.message}
                    classNames={{
                      inputWrapper: "border-[#006d63]",
                    }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Password"
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={errors.password !== undefined}
                    errorMessage={errors.password?.message}
                    classNames={{
                      inputWrapper: "border-[#006d63]",
                    }}
                    endContent={
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                          tabIndex={-1}
                        >
                          {isVisible ? (
                            <FaEye className="text-default-400 pointer-events-none text-xl" />
                          ) : (
                            <FaEyeSlash className="text-default-400 pointer-events-none text-xl" />
                          )}
                        </button>
                      </span>
                    }
                  />
                )}
              />

              {/* Tombol Login */}
              <Button
                color="primary"
                className="mt-2 bg-[#006d63] text-white transition-all duration-300 hover:bg-[#00564f]"
                size="lg"
                type="submit"
                fullWidth
              >
                {isPendingLogin ? (
                  <Spinner color="white" size="sm" />
                ) : (
                  "Log In"
                )}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login;
