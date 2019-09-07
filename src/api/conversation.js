import { api } from './index';

function clearChat() {
  return api.post('/admin/messages/delete');
}

export default {
  clearChat,
};
