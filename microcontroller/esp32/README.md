1. Install esptool
    ```powershell
    pip install esptool
    ```
    or download the binaries [here](https://github.com/espressif/esptool/releases/tag/v4.6.2)

2. Download & install chipset driver (only windows)

    Download [here](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers?tab=downloads)

    Check the right port:
    - On Windows usually is COM3
    - On linux is /dev/ttyUSB0

3. Download the firmware
    Download all files [here](https://www.espruino.com/binaries/espruino_2v19_esp32/):
    - bootloader.bin
    - espruino_esp32.bin
    - partitions_espruino.bin

4. Erase flash memory

    Hold press the BOOT physical button and run this command:
    ```powershell
    .\esptool.exe --chip esp32 --port COM3 erase_flash
    ```
5. Flash the firmware

    Run this command:
    ```powershell
    .\esptool.exe --chip esp32 --port COM3 --baud 921600 write_flash -z --flash_mode "dio" --flash_freq "40m" 0x1000 bootloader.bin 0x10000 espruino_esp32.bin 0x8000 partitions_espruino.bin
    ```

6. Connect your esp32 to Espruino Web IDE

    - Open [https://www.espruino.com/ide/](https://www.espruino.com/ide/)
    - Go to settings, communications tab and set the baud rate to 115200 (for the first time)
    - Click Connect/Disconnect button (it is the green button)
    - Click the upload destination (is the processor button) and select one of those options
    - Click again the button


## Diagram

![image.png](https://esphome.io/_images/nodemcu_esp32-full.jpg)
