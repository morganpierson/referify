import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-900">
      <SignIn afterSignInUrl={'/new-user'} redirectUrl={'/new-user'}/>
    </div>
  )
}

export default SignInPage
