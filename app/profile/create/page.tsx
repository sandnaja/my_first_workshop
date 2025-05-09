import { SubmitButton } from "@/components/form/Buttons";
import FormInput from "@/components/form/FormInput";
// import { Button } from "@/components/ui/button";

const createProfileAction = async (formData: FormData) => {
  "use server";
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const username = formData.get("username") as string;
  console.log("TEST TEST TSET", firstName);
  console.log("TEST TEST TSET", lastName);
  console.log("TEST TEST TSET", username);
};
const CreateProfile = () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">New User</h1>
      <div className="border p-8 rounded-md">
        <form action={createProfileAction}>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <FormInput name="firstName" label="First Name" type="text" placeholder="First Name" />
            <FormInput name="lastName" label="Last Name" type="text" placeholder="Last Name" />
            <FormInput name="username" label="Username" type="text" placeholder="Username" />
          </div>
          <SubmitButton text="Create Profile" size='lg' />
        </form>
      </div>
    </section>
  );
};
export default CreateProfile;
