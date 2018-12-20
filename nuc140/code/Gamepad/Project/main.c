//
// smpl_GPIO_Interrupt
//
// GPA15 to input interrupt
// GPD15 to input interrupt

#include <stdio.h>
#include "Driver\DrvUART.h"
#include "Driver\DrvGPIO.h"
#include "Driver\DrvSYS.h"
#include "NUC1xx.h"

#define  PWM_CLKSRC_SEL   3        //0: 12M, 1:32K, 2:HCLK, 3:22M
#define  PWM_ClockSource  22000000 // 22M
#define  PWM_PreScaler    21      // clock is divided by (PreScaler + 1)
#define  PWM_ClockDivider 4        // 0: 1/2, 1: 1/4, 2: 1/8, 3: 1/16, 4: 1
#define  Cycle        219 

char temp=' ';
int flag = 0;
void Uart_sendStr(uint8_t *str);
void Vibrate(int time, int percent);
void Vibrate1(int time);

void UART_INT_HANDLE(void)
{
	while(UART0->ISR.RDA_IF==1) 
	{
		temp=UART0->DATA;
		if(flag){
			if(temp=='H'){
				Vibrate(1,90);
				DrvGPIO_SetBit(E_GPA,14);
				DrvSYS_Delay(50000);
				DrvGPIO_ClrBit(E_GPA, 14); 
			}
			flag = 0;
		}
		
		if(temp=='='){
			flag=1;
		}
	}
}

void GPIOAB_INT_CallBack(uint32_t GPA_IntStatus, uint32_t GPB_IntStatus)
{
	if ((GPA_IntStatus>>12) & 0x01){
		Uart_sendStr("O");
	}
	if ((GPA_IntStatus>>13) & 0x01){
		Uart_sendStr("C");
	}
}

void GPIOCDE_INT_CallBack(uint32_t GPC_IntStatus, uint32_t GPD_IntStatus, uint32_t GPE_IntStatus)
{  
	if ((GPC_IntStatus>>1) & 0x01){
		Uart_sendStr("D");
	}
	if ((GPC_IntStatus>>2) & 0x01){
		Uart_sendStr("R");
	}
	if ((GPC_IntStatus>>3) & 0x01){
		Uart_sendStr("L");
	}
	if ((GPD_IntStatus>>7) & 0x01){
		Uart_sendStr("U");
	}
}

void InitLed(void){
	DrvGPIO_Open(E_GPA, 15, E_IO_OUTPUT); // GPC12 pin set to output mode
	DrvGPIO_ClrBit(E_GPA, 15);            // Goutput Hi to turn off LED
	DrvGPIO_Open(E_GPA, 14, E_IO_OUTPUT); // GPC12 pin set to output mode
	DrvGPIO_ClrBit(E_GPA, 14);            // Goutput Hi to turn off LED
}

void InterruptConfig(){
	DrvGPIO_Open(E_GPA,12,E_IO_INPUT);
	DrvGPIO_Open(E_GPA,13,E_IO_INPUT);
  DrvGPIO_EnableInt(E_GPA, 12, E_IO_RISING, E_MODE_EDGE);		//BTN OK
  DrvGPIO_EnableInt(E_GPA, 13, E_IO_RISING, E_MODE_EDGE);		//BTN CANCLE
	DrvGPIO_EnableInt(E_GPC, 1, E_IO_RISING, E_MODE_EDGE);		//BTN DOWN
  DrvGPIO_EnableInt(E_GPC, 2, E_IO_RISING, E_MODE_EDGE);		//BTN RIGHT
	DrvGPIO_EnableInt(E_GPC, 3, E_IO_RISING, E_MODE_EDGE);		//BTN LEFT
  DrvGPIO_EnableInt(E_GPD, 7, E_IO_RISING, E_MODE_EDGE);		//BTN UP
  DrvGPIO_SetDebounceTime(5, 1);
	DrvGPIO_EnableDebounce(E_GPA, 12);
	DrvGPIO_EnableDebounce(E_GPA, 13);
	DrvGPIO_EnableDebounce(E_GPC, 1);
	DrvGPIO_EnableDebounce(E_GPC, 2);
	DrvGPIO_EnableDebounce(E_GPC, 3);
	DrvGPIO_EnableDebounce(E_GPD, 7);
  DrvGPIO_SetIntCallback(GPIOAB_INT_CallBack, GPIOCDE_INT_CallBack);
}

void Uart_sendStr(uint8_t *str)
{
	while(*str)
	{
			DrvUART_Write(UART_PORT0,str,1);
			DrvSYS_Delay(10000);
			str++;
	}
}

void UartConfig(){
	STR_UART_T myuart;

	DrvGPIO_InitFunction(E_FUNC_UART0);   

	/* UART Setting */
	myuart.u32BaudRate         = 115200;
	myuart.u8cDataBits         = DRVUART_DATABITS_8;
	myuart.u8cStopBits         = DRVUART_STOPBITS_1;
	myuart.u8cParity         = DRVUART_PARITY_NONE;
	myuart.u8cRxTriggerLevel	= DRVUART_FIFO_1BYTES;

	/* Set UART Configuration */
	if(DrvUART_Open(UART_PORT0,&myuart) != E_SUCCESS) 
			DrvGPIO_SetBit(E_GPC,14);
	else if(DrvUART_Open(UART_PORT0,&myuart) == E_SUCCESS)
		DrvUART_EnableInt(UART_PORT0, DRVUART_RDAINT, UART_INT_HANDLE);
}

void InitPWM()
{
	SYS->GPAMFP.PWM3_I2SMCLK=1;  // Enable PWM3 multi-function pin
	SYSCLK->CLKSEL1.PWM23_S = PWM_CLKSRC_SEL; // Select 22Mhz for PWM clock source		
	SYSCLK->APBCLK.PWM23_EN =1;  // Enable PWM2 & PWM3 clock	
	PWMA->PPR.CP23=1;			      // Prescaler 0~255, Setting 0 to stop output clock
	PWMA->CSR.CSR3=0;			      // PWM clock = clock source/(Prescaler + 1)/divider
	PWMA->PCR.CH3MOD=1;			    // 0:One-shot mode, 1:Auto-load mode
															// CNR and CMR will be auto-cleared after setting CH2MOD form 0 to 1.	
	PWMA->CNR3=0xFFFF;           // CNR : counting down   // PWM output high if CMRx+1 >= CNR
	PWMA->CMR3=0xFFFF;		        // CMR : fix to compare  // PWM output low  if CMRx+1 <  CNR
	PWMA->PCR.CH3INV=0;          // Inverter->0:off, 1:on
	PWMA->PCR.CH3EN=1;			      // PWM function->0:Disable, 1:Enable
	PWMA->POE.PWM3=1;			      // Output to pin->0:Diasble, 1:Enable		
}

void Vibrate(int time, int percent)
{
	uint16_t HiTime = percent*Cycle/100;
	if(percent==0){
		HiTime=1;
	}
	PWMA->CSR.CSR3 = 0;             // diver factor = 0: 1/2, 1: 1/4, 2: 1/8, 3: 1/16, 4: 1
	PWMA->PPR.CP23 = PWM_PreScaler; // set PreScaler
	PWMA->CNR3 = Cycle;    					// set CNR
	PWMA->CMR3 = HiTime -1;     		// set CMR
	PWMA->POE.PWM3=1;
}

int main()
{
	InitLed();
	InterruptConfig();
	UartConfig();
	InitPWM();
	
	DrvGPIO_Open(E_GPC, 0, E_IO_OUTPUT); // GPC12 pin set to output mode
	DrvGPIO_ClrBit(E_GPC, 0);            // Goutput Hi to turn off LED
	DrvGPIO_SetBit(E_GPC,0);
	
	
	while(1)    
	{	
		int p;
		for (p=0; p<=100; p+=10) {
			Vibrate(1, p);	
			DrvSYS_Delay(1000000);
		}
	}
}
