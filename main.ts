
/**
 * 
 */
enum GROVE_TWO_IMU_9DOF {
    DEF_I2C_ADDR = 0x04,  // The device i2c address in default
    VID = 0x2886,         // Vender ID of the device
    PID = 0x0004          // Product ID of the device
}

/**
 * 
 */
enum GROVE_TWO_IMU_9DOF_CMD_TYPE {
    I2C_CMD_GET_DEV_ID = 0x00,      // This command gets device ID information
    I2C_CMD_GET_DEV_EVENT = 0x01,   // This command gets device event status
    I2C_CMD_GET_ACCEL_X = 0x02,     // This command gets the accelerometer value on X-axis
    I2C_CMD_GET_ACCEL_Y = 0x03,     // This command gets the accelerometer value on Y-axis
    I2C_CMD_GET_ACCEL_Z = 0x04,     // This command gets the accelerometer value on Z-axis
    I2C_CMD_GET_GYRO_X = 0x05,      // This command gets the gyroscope value on X-axis
    I2C_CMD_GET_GYRO_Y = 0x06,      // This command gets the gyroscope value on Y-axis
    I2C_CMD_GET_GYRO_Z = 0x07,      // This command gets the gyroscope value on Z-axis
    I2C_CMD_GET_MAG_X = 0x08,       // This command gets the magnetometer value on X-axis
    I2C_CMD_GET_MAG_Y = 0x09,       // This command gets the magnetometer value on Y-axis
    I2C_CMD_GET_MAG_Z = 0x0a,       // This command gets the magnetometer value on Z-axis
    I2C_CMD_GET_ACCEL_X_Y_Z = 0x0b, // This command gets the accelerometer values on ALL axis
    I2C_CMD_GET_GYRO_X_Y_Z = 0x0c,  // This command gets the gyroscope values on ALL axis
    I2C_CMD_GET_MAG_X_Y_Z = 0x0d,   // This command gets the magnetometer values on ALL axis
    I2C_CMD_GET_ALL_X_Y_Z = 0x0e,   // This command gets the values of accelerometer, gyroscope and magnetometer on ALL axis
    I2C_CMD_GET_HEADING = 0x0f,     // This command gets direction angle
    I2C_CMD_GET_ROTATION = 0x10,    // This command gets rotation angle
    I2C_CMD_SET_RANGE = 0x11,       // This command sets range
    I2C_CMD_SET_RATE = 0x12,        // This command sets rate
    I2C_CMD_LED_ON = 0xb0,          // This command turns on the indicator LED flash mode
    I2C_CMD_LED_OFF = 0xb1,         // This command turns off the indicator LED flash mode
    I2C_CMD_AUTO_SLEEP_ON = 0xb2,   // This command enable device auto sleep mode
    I2C_CMD_AUTO_SLEEP_OFF = 0xb3,  // This command disable device auto sleep mode (default mode)
    I2C_CMD_SET_ADDR = 0xc0,        // This command sets device i2c address
    I2C_CMD_RST_ADDR = 0xc1,        // This command resets device i2c address
}


/**
 * 
 */
enum IMU_EVENT_TYPE // imu event define
{
    //% block=None
    EVENT_NULL = 0,
    //% block=X+
    TILT_X_P = 1,
    //% block=X-
    TILT_X_N = 2,
    //% block=Y+
    TILT_Y_P = 3,
    //% block=Y-
    TILT_Y_N = 4,
    //% block=Z+
	TILT_Z_P = 5,
    //% block=Z-
    TILT_Z_N = 6,
    //% block=Free Fall
	FREE_FALL = 7,
};

/**
 * 
 */
enum IMU_ACCEL_FSR_TYPE // accel range define
{
    IMU_FSR_2G = 0,
    IMU_FSR_4G = 1,
    IMU_FSR_8G = 2,
    IMU_FSR_16G = 3
};

/**
 * 
 */
enum IMU_ACCEL_DLPF_TYPE // accel rate define
{
    IMU_ACCEL_DLPF_460HZ = 0,
    IMU_ACCEL_DLPF_184HZ = 1,
    IMU_ACCEL_DLPF_92HZ = 2,
    IMU_ACCEL_DLPF_41HZ = 3,
    IMU_ACCEL_DLPF_20HZ = 4,
    IMU_ACCEL_DLPF_10HZ = 5,
    IMU_ACCEL_DLPF_5HZ = 6
};

/**
 * 
 */
enum IMU_GYRO_FSR_TYPE // gyro range define
{
    IMU_FSR_250DPS = 0,
    IMU_FSR_500DPS = 1,
    IMU_FSR_1000DPS = 2,
    IMU_FSR_2000DPS = 3
};

/**
 * 
 */
enum IMU_GYRO_DLPF_TYPE // gyro rate define
{
    IMU_GYRO_DLPF_250HZ = 0,
    IMU_GYRO_DLPF_184HZ = 1,
    IMU_GYRO_DLPF_92HZ = 2,
    IMU_GYRO_DLPF_41HZ = 3,
    IMU_GYRO_DLPF_20HZ = 4,
    IMU_GYRO_DLPF_10HZ = 5,
    IMU_GYRO_DLPF_5HZ = 6
};

/**
 * Functions to operate Grove Two IMU 9DOF module.
 */
//% weight=10 color=#9F79EE icon="\uf108"
namespace Grove_Two_IMU_9DOF
{
    let Event = 0;
    let wakePin: DigitalPin = DigitalPin.P8;
    // let wakePin: DigitalPin = DigitalPin.P12;
    
    export function wakeupDevice()
    {
        pins.digitalWritePin(wakePin, 0);
        control.waitMicros(25);
        pins.digitalWritePin(wakePin, 1);
        control.waitMicros(25);
    }
    
    export function i2cSendByte(address: number, data: number)
    {
        let buf: Buffer = pins.createBuffer(1);
        buf[0] = data;
        wakeupDevice();
        pins.i2cWriteBuffer(address, buf, false);
    }
    
    export function i2cSendBytes(address: number, data: Buffer)
    {
        wakeupDevice();
        pins.i2cWriteBuffer(address, data, false);
    }
    
    export function i2cReceiveByte(address: number): number
    {
        let buf: Buffer = pins.createBuffer(1);
        wakeupDevice();
        buf = pins.i2cReadBuffer(address, 1, false);
        return buf[0];
    }
    
    export function i2cReceiveBytes(address: number, len: number): Buffer
    {
        let buf: Buffer = pins.createBuffer(len);
        wakeupDevice();
        buf = pins.i2cReadBuffer(address, len, false);
        return buf;
    }
    
    export class IMU
    {
        currentDeviceAddress: number;
        
        private numberFormat(data: number): number
        {
            if(data > 0x7fff)data = 0 - ((data ^ 0xffff) + 1);
            return data;
        }
        
        /**
         * Get vendor ID of device.
         */
        //% blockId=get_imu_vid block="%strip|get device vid"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        getDeviceVID(): number
        {
            let data: Buffer = pins.createBuffer(4);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_GET_DEV_ID);
            data = i2cReceiveBytes(this.currentDeviceAddress, 4);
            return (data[0] + data[1] * 256);
        }
        
        /**
         * Get product ID of device.
         */
        //% blockId=get_imu_pid block="%strip|get device pid"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        getDevicePID(): number
        {
            let data: Buffer = pins.createBuffer(4);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_GET_DEV_ID);
            data = i2cReceiveBytes(this.currentDeviceAddress, 4);
            return (data[2] + data[3] * 256);
        }
        
        /**
         * Change i2c address of device.
         * @param newAddress the new i2c address of device, eg: 4
         */
        //% blockId=change_imu_address block="%strip|change device address to|%newAddress"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        changeDeviceAddress(newAddress: number = 4)
        {
            let data: Buffer = pins.createBuffer(2);
            data[0] = GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_SET_ADDR;
            data[1] = newAddress;
            i2cSendBytes(this.currentDeviceAddress, data);
            this.currentDeviceAddress = newAddress;
        }
        
        /**
         * Restore the i2c address of device to default.
         */
        //% blockId=default_imu_address block="%strip|default device address"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        defaultDeviceAddress()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_RST_ADDR);
        }
        
        /**
         * Trun on the indicator LED flash mode.
         */
        //% blockId=turn_on_imu_led_flash block="%strip|turn on led flash"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        turnOnLedFlash()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_LED_ON);
        }
        
        /**
         * Trun off the indicator LED flash mode.
         */
        //% blockId=turn_off_imu_led_flash block="%strip|turn off led flash"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        turnOffLedFlash()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_LED_OFF);
        }
        
        /**
         * Enable device auto sleep mode.
         */
        //% blockId=enable_imu_auto_sleep block="%strip|enable auto sleep"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        enableAutoSleep()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_AUTO_SLEEP_ON);
        }
        
        /**
         * Disable device auto sleep mode.
         */
        //% blockId=disable_imu_auto_sleep block="%strip|disable auto sleep"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        disableAutoSleep()
        {
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_AUTO_SLEEP_OFF);
        }
        
        /**
         * Get the imu event status.
         */
        //% blockId=get_imu_event_status block="%strip|get event status"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        getEventStatus(): IMU_EVENT_TYPE
        {
            let data: Buffer = pins.createBuffer(4);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_GET_DEV_EVENT);
            data = i2cReceiveBytes(this.currentDeviceAddress, 4);
            return data[0];
        }
        
        /**
         * Get the imu event status.
         */
        //% blockId=run_imu_get_event_status block="%strip|run"
        run()
        {
            Event = this.getEventStatus();
        }
        
        /**
         * Check the imu event status.
         */
        //% blockId=is_imu_event_status block="%strip|is|%status"
        is(status: IMU_EVENT_TYPE): boolean
        {
            if(Event == status) return true;
            else return false;
        }
        
        /**
         * Get the accelerometer value on X-axis.
         */
        //% blockId=get_imu_accel_axis_x block="%strip|get accel axis x"
        getAccelAxisX(): number
        {
            let data: Buffer = pins.createBuffer(2);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_GET_ACCEL_X);
            data = i2cReceiveBytes(this.currentDeviceAddress, 2);
            return this.numberFormat(data[0] + data[1] * 256);
        }
        
        /**
         * Get the accelerometer value on Y-axis.
         */
        //% blockId=get_imu_accel_axis_y block="%strip|get accel axis y"
        getAccelAxisY(): number
        {
            let data: Buffer = pins.createBuffer(2);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_GET_ACCEL_Y);
            data = i2cReceiveBytes(this.currentDeviceAddress, 2);
            return this.numberFormat(data[0] + data[1] * 256);
        }
        
        /**
         * Get the accelerometer value on Z-axis.
         */
        //% blockId=get_imu_accel_axis_z block="%strip|get accel axis z"
        getAccelAxisZ(): number
        {
            let data: Buffer = pins.createBuffer(2);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_GET_ACCEL_Z);
            data = i2cReceiveBytes(this.currentDeviceAddress, 2);
            return this.numberFormat(data[0] + data[1] * 256);
        }

        /**
         * Get the gyroscope value on X-axis.
         */
        //% blockId=get_imu_gyro_axis_x block="%strip|get gyro axis x"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        getGyroAxisX(): number
        {
            let data: Buffer = pins.createBuffer(2);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_GET_GYRO_X);
            data = i2cReceiveBytes(this.currentDeviceAddress, 2);
            return this.numberFormat(data[0] + data[1] * 256);
        }
        
        /**
         * Get the gyroscope value on Y-axis.
         */
        //% blockId=get_imu_gyro_axis_y block="%strip|get gyro axis y"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        getGyroAxisY(): number
        {
            let data: Buffer = pins.createBuffer(2);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_GET_GYRO_Y);
            data = i2cReceiveBytes(this.currentDeviceAddress, 2);
            return this.numberFormat(data[0] + data[1] * 256);
        }
        
        /**
         * Get the gyroscope value on Z-axis.
         */
        //% blockId=get_imu_gyro_axis_z block="%strip|get gyro axis z"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        getGyroAxisZ(): number
        {
            let data: Buffer = pins.createBuffer(2);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_GET_GYRO_Z);
            data = i2cReceiveBytes(this.currentDeviceAddress, 2);
            return this.numberFormat(data[0] + data[1] * 256);
        }
        
        /**
         * Get the magnetometer value on X-axis.
         */
        //% blockId=get_imu_magnet_axis_x block="%strip|get magnet axis x"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        getMagnetAxisX(): number
        {
            let data: Buffer = pins.createBuffer(2);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_GET_MAG_X);
            data = i2cReceiveBytes(this.currentDeviceAddress, 2);
            return this.numberFormat(data[0] + data[1] * 256);
        }
        
        /**
         * Get the magnetometer value on Y-axis.
         */
        //% blockId=get_imu_magnet_axis_y block="%strip|get magnet axis y"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        getMagnetAxisY(): number
        {
            let data: Buffer = pins.createBuffer(2);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_GET_MAG_Y);
            data = i2cReceiveBytes(this.currentDeviceAddress, 2);
            return this.numberFormat(data[0] + data[1] * 256);
        }
        
        /**
         * Get the magnetometer value on Z-axis.
         */
        //% blockId=get_imu_magnet_axis_z block="%strip|get magnet axis z"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        getMagnetAxisZ(): number
        {
            let data: Buffer = pins.createBuffer(2);
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_GET_MAG_Z);
            data = i2cReceiveBytes(this.currentDeviceAddress, 2);
            return this.numberFormat(data[0] + data[1] * 256);
        }
        
        /**
         * Get the accelerometer values on X, Y and Z axis.
         */
        //% blockId=get_imu_accel_3_axis_data block="%strip|get accel 3 axis"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        getAccel3AxisData(): number[]
        {
            let data: Buffer = pins.createBuffer(6);
            let accel: number[] = [0,0,0];
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_GET_ACCEL_X_Y_Z);
            data = i2cReceiveBytes(this.currentDeviceAddress, 6);           
            accel[0] = this.numberFormat(data[0] + (data[1] * 256));
            accel[1] = this.numberFormat(data[2] + (data[3] * 256));
            accel[2] = this.numberFormat(data[4] + (data[5] * 256));
            return accel;
        }
        
        /**
         * Get the gyroscope values on X, Y and Z axis.
         */
        //% blockId=get_imu_gyro_3_axis_data block="%strip|get gyro 3 axis"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        getGyro3AxisData(): number[]
        {
            let data: Buffer = pins.createBuffer(6);
            let gyro: number[] = [0,0,0];
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_GET_GYRO_X_Y_Z);
            data = i2cReceiveBytes(this.currentDeviceAddress, 6);
            gyro[0] = this.numberFormat(data[0] + data[1] * 256);
            gyro[1] = this.numberFormat(data[2] + data[3] * 256);
            gyro[2] = this.numberFormat(data[4] + data[5] * 256);
            return gyro;
        }
        
        /**
         * Get the magnetometer values on X, Y and Z axis.
         */
        //% blockId=get_imu_magnet_3_axis_data block="%strip|get magnet 3 axis"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        getMagnet3AxisData(): number[]
        {
            let data: Buffer = pins.createBuffer(6);
            let magnet: number[] = [0,0,0];
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_GET_MAG_X_Y_Z);
            data = i2cReceiveBytes(this.currentDeviceAddress, 6);
            magnet[0] = this.numberFormat(data[0] + data[1] * 256);
            magnet[1] = this.numberFormat(data[2] + data[3] * 256);
            magnet[2] = this.numberFormat(data[4] + data[5] * 256);
            return magnet;
        }
        
        /**
         * Get the values of accelerometer, gyroscope and magnetometer on X, Y and Z axis.
         */
        //% blockId=get_imu_9_axis_data block="%strip|get imu 9 axis"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        get9AxisData(): number[]
        {
            let data: Buffer = pins.createBuffer(18);
            let imu: number[] = [0,0,0,0,0,0,0,0,0];
            i2cSendByte(this.currentDeviceAddress, GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_GET_ALL_X_Y_Z);
            data = i2cReceiveBytes(this.currentDeviceAddress, 18);
            for(let i = 0; i < 3; i ++)
            {
                imu[i] = this.numberFormat(data[i * 2] + data[i * 2 + 1] * 256);
                imu[i + 3] = this.numberFormat(data[i * 2 + 6] + data[i * 2 + 1 + 6] * 256);
                imu[i + 6] = this.numberFormat(data[i * 2 + 12] + data[i * 2 + 1 + 12] * 256);
            }
            return imu;
        }
        
        /**
         * Set the range of accelerometer.
         * @param range the range of accelerometer.
         */
        //% blockId=set_imu_accel_range block="%strip|set accel range|%range"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        setAccelRange(range: IMU_ACCEL_FSR_TYPE)
        {
            let data: Buffer = pins.createBuffer(3);
            data[0] = GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_SET_RANGE;
            data[1] = 0;
            data[2] = range;
            i2cSendBytes(this.currentDeviceAddress, data);
        }
        
        /**
         * Set the rate of accelerometer.
         * @param rate the rate of accelerometer.
         */
        //% blockId=set_imu_accel_rate block="%strip|set accel rate|%rate"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        setAccelRate(rate: IMU_ACCEL_DLPF_TYPE)
        {
            let data: Buffer = pins.createBuffer(3);
            data[0] = GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_SET_RATE;
            data[1] = 0;
            data[2] = rate;
            i2cSendBytes(this.currentDeviceAddress, data);
        }
        
        /**
         * Set the range of gyroscope.
         * @param range the range of gyroscope.
         */
        //% blockId=set_imu_gyro_range block="%strip|set gyro range|%range"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        setGyroRange(range: IMU_GYRO_FSR_TYPE)
        {
            let data: Buffer = pins.createBuffer(3);
            data[0] = GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_SET_RANGE;
            data[1] = 1;
            data[2] = range;
            i2cSendBytes(this.currentDeviceAddress, data);
        }
        
        /**
         * Set the rate of gyroscope.
         * @param rate the rate of gyroscope.
         */
        //% blockId=set_imu_gyro_rate block="%strip|set gyro rate|%rate"
        //% parts="Grove_Two_IMU_9DOF" advanced=true
        setGyroRate(rate: IMU_GYRO_DLPF_TYPE)
        {
            let data: Buffer = pins.createBuffer(3);
            data[0] = GROVE_TWO_IMU_9DOF_CMD_TYPE.I2C_CMD_SET_RATE;
            data[1] = 1;
            data[2] = rate;
            i2cSendBytes(this.currentDeviceAddress, data);
        }
    }
    
    /**
     * Create a new driver for imu
     * @param address the address of device, eg: 4
     */
    //% blockId=create_imu block="create module and set address|%address"
    export function create(address: number = 4): IMU
    {
        let imu = new IMU();
        imu.currentDeviceAddress = address;
        return imu;
    }
}