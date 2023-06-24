import { useState , useEffect} from 'react'
import { useGetUsersQuery } from './services/users'
import { FaEnvelopeOpen, FaUser, FaCalendarTimes, FaMap , FaPhone, FaLock} from 'react-icons/fa'

function App() {
  const [person, setPerson] = useState(null);
  const [value, setValue] = useState("Random Person");
  const [title, setTitle] = useState("name");

  const {data, isLoading, refetch } = useGetUsersQuery();

  useEffect(() => {
    if(data) {
      const randomPerson = data.results[0];
      const { phone, email } = randomPerson;
      const {large: image} = randomPerson.picture;
      const { password } = randomPerson.login;
      const { first , last } = randomPerson.name;
      const {dob: {age}} = randomPerson;
      const {
        street: { number, name }
      } = randomPerson.location;
      const newPerson = {
        image, 
        phone, 
        email, 
        password,
        age,
        street: `${number} ${name}`,
        name: `${first} ${last}`,
      }
      setPerson(newPerson);
      setTitle("name");
      setValue(newPerson.name);
    }
  }, [data]) ;

  const handleValue = (e) => {
    if(e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  return (
    <main>
      <div className="bg">
        <div className="black"></div>
          <div className="container">
            <img 
            src={person && person.image} 
            alt="Random_User"
            className='user-image'
            />
            <p className="user-title ">My {title}</p>
            <p className="user-value">{value}</p>
            <div className="values-list">
              <button data-label="name" onClick={handleValue} className="icon">
                <FaUser />
              </button>
              <button data-label="email" onClick={handleValue} className="icon">
                <FaEnvelopeOpen />
              </button>
              <button data-label="age" onClick={handleValue}  className="icon">
                <FaCalendarTimes />
              </button>
              <button data-label="street" onClick={handleValue} className="icon">
                <FaMap />
              </button>
              <button data-label="phone" onClick={handleValue} className="icon">
                <FaPhone />
              </button>
              <button data-label="password" onClick={handleValue} className="icon">
                <FaLock />
              </button>
            </div>
            <button type="button" className="btn" onClick={() => refetch()}>
              {isLoading ? "loading..." : "random user"}
            </button>
          </div>
      </div>
    </main>
  )
}

export default App
