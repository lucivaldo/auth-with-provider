import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

export function Home() {
  const { user, token, signout } = useAuth()

  const handleSignout = () => {
    signout()
  }

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-5xl">
      <h3 className="font-medium text-xl">Home</h3>

      {user == null ? (
        <Link
          to="/signin"
          className="text-blue-700 font-medium hover:text-blue-800"
        >
          Signin
        </Link>
      ) : (
        <button
          type="button"
          className="text-blue-700 font-medium hover:text-blue-800"
          onClick={handleSignout}
        >
          Signout
        </button>
      )}

      <div className="mt-6 bg-slate-100 p-3 rounded">
        <p className="font-medium mb-3">Current user: </p>

        <pre>{JSON.stringify(user, null, 2)}</pre>

        <p className="font-medium my-3">Token:</p>
        <span className="break-words">{token}</span>
      </div>
    </div>
  )
}
