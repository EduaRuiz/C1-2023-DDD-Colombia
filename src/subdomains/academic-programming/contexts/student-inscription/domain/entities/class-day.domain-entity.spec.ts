import { ClassDayDomainEntity, GroupDomainEntity } from '.';

describe('ClassDayDomainEntity', () => {
  const classDayId = 'class123';
  const weekDay = 'M';
  const startTime = 15;
  const duration = 2;
  const group = {} as unknown as GroupDomainEntity;

  describe('constructor', () => {
    it('should create an instance of ClassDayDomainEntity', () => {
      // Arrange & Act
      const classDay = new ClassDayDomainEntity(
        classDayId,
        weekDay,
        startTime,
        duration,
        group,
      );
      // Assert
      expect(classDay).toBeInstanceOf(ClassDayDomainEntity);
      expect(classDay.classDayId).toBe(classDayId);
      expect(classDay.weekDay).toBe(weekDay);
      expect(classDay.startTime).toBe(startTime);
      expect(classDay.duration).toBe(duration);
      expect(classDay.group).toBe(group);
    });

    it('should create an instance of ClassDayDomainEntity without group', () => {
      // Arrange & Act
      const classDay = new ClassDayDomainEntity(
        classDayId,
        weekDay,
        startTime,
        duration,
      );
      // Assert
      expect(classDay).toBeInstanceOf(ClassDayDomainEntity);
      expect(classDay.classDayId).toBe(classDayId);
      expect(classDay.weekDay).toBe(weekDay);
      expect(classDay.startTime).toBe(startTime);
      expect(classDay.duration).toBe(duration);
      expect(classDay.group).toBeUndefined();
    });
  });
});
