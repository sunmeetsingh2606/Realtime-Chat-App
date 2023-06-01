import { ClipLoader } from "react-spinners"


function Spinner() {
  return (
    <div className="w-full h-full grid place-items-center">
        <ClipLoader color='#6b8afd' />
    </div>
  )
}

export default Spinner