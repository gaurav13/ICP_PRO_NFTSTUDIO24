// import axios from '@/components/axios/';
import logger from '@/lib/logger';
// import oAxios from 'axios';
// import { create } from 'ipfs-http-client';
import moment from 'moment';
import numeral from 'numeral';
import { toast } from 'react-toastify';
const utcToLocal = (date: string, format: string, iso?: boolean): string => {
  let stillUtc;
  if (date === '') {
    stillUtc = moment.utc();
  } else {
    stillUtc = moment.utc(parseInt(date)).toDate();
  }

  if (iso) {
    var local = moment(stillUtc).local().toISOString();
  } else {
    var local = moment(stillUtc).local().format(format);
  }
  return local;
};
function formatLikesCount(likes: any) {
  if (likes >= 1000000000) {
    return numeral(likes).format('0.0a').toUpperCase();
  } else if (likes >= 1000000 && likes < 1000000000) {
    return numeral(likes).format('0.0a').toUpperCase();
  } else if (likes >= 1000 && likes < 1000000) {
    return numeral(likes).format('0.0a').toUpperCase();
  } else {
    return likes.toString();
  }
}

// its comman function to check is user connected
const isUserConnected = (auth: any, handleConnectModal: any) => {
  if (auth.state === 'anonymous') {
    toast.error(
      'To perform this action, kindly connect to Internet Identity.',
      {}
    );
    handleConnectModal();
    return false;
  }
  return true;
};
export { utcToLocal, formatLikesCount, isUserConnected };
