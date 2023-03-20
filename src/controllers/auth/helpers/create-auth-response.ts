import { AuthResponse } from '../types';
import JwtTokenService from '../../../services/jwt-token-service';

const createAuthResponse = ({ password, ...userViewModel }: UserEntity): AuthResponse => ({

  user: userViewModel,
  token: JwtTokenService.createToken({
    email: userViewModel.email,
    id: userViewModel.id,
  }),

});

export default createAuthResponse;
