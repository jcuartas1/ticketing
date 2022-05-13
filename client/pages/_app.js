import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BuildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
 
  return (
    <div>
      <Header currentUser={currentUser}/>
      <div className='container'>
        <Component currentUser = { currentUser } {...pageProps}/>
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async appContext => {
  const client = BuildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};

  if(appContext.Component.getInitialProps){

    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);

  }

  return {
    pageProps,
    currentUser: data.currentUser  
  }
};

export default AppComponent;