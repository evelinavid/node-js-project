import NotFoundError from 'errors/not-found-error';

class CarNotFoundError extends NotFoundError {
    constructor(id: string) {
        super(`Car with ${id} was not found`);
    }
}

export default CarNotFoundError;
