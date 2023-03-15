import { ChangeInscriptionStateHelper } from '.';
import { IInscriptionDomainService } from '@contexts/student-inscription/domain/services';
import { ChangedInscriptionStateEventPublisher } from '@contexts/student-inscription/domain/events';
import { InscriptionDomainEntity } from '@contexts/student-inscription/domain/entities';
import { AggregateRootException } from '@sofka/exceptions/aggregate-root.exception';

describe('ChangeInscriptionStateHelper', () => {
  let mockService: IInscriptionDomainService;
  let mockEvent: ChangedInscriptionStateEventPublisher;
  const inscriptionId = '12345';
  const inscriptionState = 'approved';
  const currentInscription = {
    inscriptionId,
    inscriptionState,
  } as InscriptionDomainEntity;
  let helper: typeof ChangeInscriptionStateHelper;

  beforeEach(() => {
    mockService = {
      getInscription: jest.fn().mockReturnValue(currentInscription),
      changeInscriptionState: jest.fn().mockReturnValue(currentInscription),
    } as unknown as IInscriptionDomainService;
    mockEvent = {
      response: undefined,
      publish: jest.fn(),
    } as unknown as ChangedInscriptionStateEventPublisher;
    helper = ChangeInscriptionStateHelper;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when either the service or event is not provided', () => {
    it('should be defined', () => {
      // Assert
      expect(helper).toBeDefined();
    });

    it('should throw AggregateRootException if service is undefined', async () => {
      // Arrange
      mockService = undefined as unknown as IInscriptionDomainService;
      const expectedMessage =
        'Servicio del tipo IInscriptionDomainService no recibido';
      // Act
      const result = () =>
        helper(inscriptionId, inscriptionState, mockService, mockEvent);
      // Assert
      await expect(result).rejects.toThrow(AggregateRootException);
      await expect(result).rejects.toThrow(expectedMessage);
    });

    it('should throw AggregateRootException if event is undefined', async () => {
      // Arrange
      mockEvent = undefined as unknown as ChangedInscriptionStateEventPublisher;
      const expectedMessage =
        'Evento del tipo ChangedInscriptionStateEventPublisher no recibido';
      // Act
      const result = () =>
        helper(inscriptionId, inscriptionState, mockService, mockEvent);
      // Assert
      await expect(result).rejects.toThrow(AggregateRootException);
      await expect(result).rejects.toThrow(expectedMessage);
    });
  });
  // describe('when current inscription is not cancelled or completed', () => {});

  describe('when the current inscription is cancelled', () => {
    it('should throw an AggregateRootException', async () => {
      // Arrange
      const cancelledInscription = {
        ...currentInscription,
        inscriptionState: 'cancelled',
      } as InscriptionDomainEntity;
      const expectedMessage =
        'No se puede actualizar el estado de una inscripción completada o cancelada';
      mockService.getInscription = jest
        .fn()
        .mockResolvedValue(cancelledInscription);
      // Act
      const result = () =>
        helper(inscriptionId, inscriptionState, mockService, mockEvent);
      // Assert
      await expect(result).rejects.toThrow(AggregateRootException);
      await expect(result).rejects.toThrow(expectedMessage);
    });
  });

  describe('when the current inscription is completed', () => {
    it('should throw an AggregateRootException', async () => {
      // Arrange
      const completedInscription = {
        ...currentInscription,
        inscriptionState: 'completed',
      } as InscriptionDomainEntity;
      const expectedMessage =
        'No se puede actualizar el estado de una inscripción completada o cancelada';
      mockService.getInscription = jest
        .fn()
        .mockResolvedValue(completedInscription);
      // Act
      const result = () =>
        helper(inscriptionId, inscriptionState, mockService, mockEvent);
      //Assert
      await expect(result).rejects.toThrow(AggregateRootException);
      await expect(result).rejects.toThrow(expectedMessage);
    });
  });
  // });

  describe('when the service and event are provided', () => {
    it('should call service.getInscription', async () => {
      // Arrange
      jest.spyOn(mockService, 'getInscription');
      const expected = currentInscription;
      // Act
      const result = await helper(
        inscriptionId,
        inscriptionState,
        mockService,
        mockEvent,
      );
      // Assert
      expect(result).toEqual(expected);
      expect(mockService.getInscription).toHaveBeenCalled();
    });

    it('should call service.changeInscriptionState', async () => {
      // Arrange
      jest.spyOn(mockService, 'changeInscriptionState');
      const expected = currentInscription;
      // Act
      const result = await helper(
        inscriptionId,
        inscriptionState,
        mockService,
        mockEvent,
      );
      // Assert
      expect(mockService.changeInscriptionState).toHaveBeenCalled();
      expect(result).toEqual(expected);
    });

    it('should set event.response', async () => {
      // Arrange
      const expected = currentInscription;
      // Act
      const result = await helper(
        inscriptionId,
        inscriptionState,
        mockService,
        mockEvent,
      );
      // Assert
      expect(mockEvent.response).toEqual(expected);
      expect(result).toEqual(expected);
      // expect(mockEvent.response).toHaveBeenCalledWith(currentInscription);
    });

    it('should call event.publish', async () => {
      // Arrange
      jest.spyOn(mockEvent, 'publish');
      const expected = currentInscription;
      // Act
      const result = await helper(
        inscriptionId,
        inscriptionState,
        mockService,
        mockEvent,
      );
      // Assert
      expect(mockEvent.publish).toHaveBeenCalled();
      expect(result).toEqual(expected);
    });
  });
});
