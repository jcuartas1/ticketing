import Link from 'next/link';


const Landing = ({currentUser, tickets}) => {
console.log(tickets)
  const tickeList = tickets.map(ticket => {
    return (
      <tr key={ ticket.id }>
        <td>{ ticket.title }</td>
        <td>{ ticket.price }</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a>View</a>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Tickets</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          { tickeList }
        </tbody>
      </table>
    </div>
  )
  // currentUser? <h1>You are signed in</h1> : <h1>You are NOT signed in</h1>;
};

Landing.getInitialProps = async(context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default Landing;

// axios.get('/api/users/currentuser').catch((err)=> { console.log(err.message) })