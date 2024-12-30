import { useApiMutation } from "@commons/hooks/useApiMutation";
import { AuthService } from "@domains/auth/services/authService";
import { useAuthStore } from "@domains/auth/stores/authStore";
import { SigninResquestDTO } from "@network/types/dtos/auth.dto";
import * as Form from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const navigate = useNavigate();
  const { error, mutate } = useApiMutation({
    mutationFn: AuthService.signin,
    onSuccess: (data) => {
      if (data?.data.accessToken) {
        setAccessToken(data?.data.accessToken);
        navigate("/");
      }
    },
  });

  const { register, handleSubmit } = useForm<SigninResquestDTO>();
  return (
    <>
      <h1>sign in</h1>
      {error && <p>{error.code}</p>}
      <Form.Root>
        <Form.Field name="id">
          <Form.Label>ID</Form.Label>
          <Form.Control asChild>
            <input {...register("id", { required: true })} />
          </Form.Control>
        </Form.Field>
        <Form.Field name="password">
          <Form.Label>PW</Form.Label>
          <Form.Control asChild>
            <input type="password" {...register("password", { required: true })} />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button type="button" onClick={handleSubmit((data) => mutate(data))}>
            Sign-in
          </button>
        </Form.Submit>
      </Form.Root>
    </>
  );
}
