# Grove Two IMU 9 DOF

A PXT packet for Seeed Studio Grove Two IMU 9 DOF

## Basic usage

```blocks
// Create a module driver, specify the i2c address
let imu = Grove_Two_IMU_9DOF.create(DEVICE_ID_TYPE.GROVE_TWO_IMU_9DOF_DEF_I2C_ADDR);

// Get imu event vaule and display
while(true)
{
    imu.run();
    if(imu.is(IMU_EVENT_TYPE.TILT_X_P))basic.showString("X+");
    else if(imu.is(IMU_EVENT_TYPE.TILT_X_N))basic.showString("X-");
    else if(imu.is(IMU_EVENT_TYPE.TILT_Y_P))basic.showString("Y+");
    else if(imu.is(IMU_EVENT_TYPE.TILT_Y_N))basic.showString("Y-");
    else if(imu.is(IMU_EVENT_TYPE.TILT_Z_P))basic.showString("Z+");
    else if(imu.is(IMU_EVENT_TYPE.TILT_Z_N))basic.showString("Z-");
}
```
More operation

Use ``getDeviceVID()`` to get vendor ID of device.

Use ``getDevicePID()`` to get product ID of device.

Use ``changeDeviceAddress()`` to change i2c address of device.

Use ``defaultDeviceAddress()`` to restore the i2c address of device to default.

Use ``turnOnLedFlash()`` to trun on the indicator LED flash mode.

Use ``turnOffLedFlash()`` to trun off the indicator LED flash mode.

Use ``enableAutoSleep()`` to enable device auto sleep mode.

Use ``disableAutoSleep()`` to disable device auto sleep mode.

Use ``getEventStatus()`` to get the imu event status.

Use ``getAccelAxisX()`` to get the accelerometer value on X-axis.

Use ``getAccelAxisY()`` to get the accelerometer value on Y-axis.

Use ``getAccelAxisZ()`` to get the accelerometer value on Z-axis.

Use ``getGyroAxisX()`` to get the gyroscope value on X-axis.

Use ``getGyroAxisY()`` to get the gyroscope value on Y-axis.

Use ``getGyroAxisZ()`` to get the gyroscope value on Z-axis.

Use ``getMagnetAxisX()`` to get the magnetometer value on X-axis.

Use ``getMagnetAxisY()`` to get the magnetometer value on Y-axis.

Use ``getMagnetAxisZ()`` to get the magnetometer value on Z-axis.

Use ``getAccel3AxisData()`` to get the accelerometer values on X, Y and Z axis.

Use ``getGyro3AxisData()`` to get the gyroscope values on X, Y and Z axis.

Use ``getMagnet3AxisData()`` to get the magnetometer values on X, Y and Z axis.

Use ``get9AxisData()`` to get the values of accelerometer, gyroscope and magnetometer on X, Y and Z axis.

Use ``setAccelRange()`` to set the range of accelerometer.

Use ``setAccelRate()`` to set the rate of accelerometer.

Use ``setGyroRange()`` to set the range of gyroscope.

Use ``setGyroRate()`` to set the rate of gyroscope.


## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

