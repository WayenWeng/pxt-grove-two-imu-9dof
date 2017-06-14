{   
    let imu = Grove_Two_IMU_9DOF.create(GROVE_TWO_IMU_9DOF.DEF_I2C_ADDR);
    
    imu.turnOnLedFlash();
    basic.pause(3000);
    imu.turnOffLedFlash();
    
    while(true)
    {
        imu.run();
        if(imu.is(IMU_EVENT_TYPE.TILT_X_P))basic.showString("X+");
        else if(imu.is(IMU_EVENT_TYPE.TILT_X_N))basic.showString("X-");
        else if(imu.is(IMU_EVENT_TYPE.TILT_Y_P))basic.showString("Y+");
        else if(imu.is(IMU_EVENT_TYPE.TILT_Y_N))basic.showString("Y-");
        else if(imu.is(IMU_EVENT_TYPE.TILT_Z_P))basic.showString("Z+");
        else if(imu.is(IMU_EVENT_TYPE.TILT_Z_N))basic.showString("Z-");
        
        // let accelX = imu.getAccelAxisX();
        // basic.showString("X");
        // basic.pause(500);
        // basic.showNumber(accelX);
        // let accelY = imu.getAccelAxisY();
        // basic.showString("Y");
        // basic.pause(500);
        // basic.showNumber(accelY);
        // let accelZ = imu.getAccelAxisZ();
        // basic.showString("Z");
        // basic.pause(500);
        // basic.showNumber(accelZ);
                
        // let accel: number[] = imu.getAccel3AxisData();
        // basic.showString("X");
        // basic.pause(500);
        // basic.showNumber(accel[0]);
        // basic.showString("Y");
        // basic.pause(500);
        // basic.showNumber(accel[1]);
        // basic.showString("Z");
        // basic.pause(500);
        // basic.showNumber(accel[2]);
    }
}