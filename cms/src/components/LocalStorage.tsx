import useLocalStorage from "../hooks/useLocalStorage"

const LocalStorage = () => {
  const [name, setName] = useLocalStorage("name", "");
  return (
    <>
      <div>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter ur name"
        />
        <p>Name:{name}</p>
      </div>
    </>
  )
}

export default LocalStorage