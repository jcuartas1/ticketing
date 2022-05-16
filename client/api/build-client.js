import axios from 'axios';


const BuildClient = ({req}) => {

  if(typeof window === 'undefined'){
    // we are on the server!
    // request should be made to http://ingress-nginx-controller.ingress-ngnix

    // changes from dev to prod
    // dev: baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',

    return axios.create({
      baseURL: 'http://www.ticketing-app-test-prod.sbs',
      headers: req.headers
    });
  }else{
    // we are on the browser!
    return axios.create({
      baseURL: '/',
    });
  }
}

export default BuildClient;