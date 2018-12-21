-- khoi tao cac bien 
data = ""
charData = ""
mac = ""
physical_mac = ""
led_pin = 4
gpio.mode(pin, gpio.OUTPUT)

-- String constants
Gamepad_Data = "GamepadKey"
Gamepad_Info = "BoardInfo"
Gamepad_Vibrate = "onVibrator"

-- WIFI STATES CONSTANTS
DEV_CONNECTED = 1
DEV_DISCONNECTED = 0

is_connected = 0

wifi.setmode(wifi.STATION)

--connect to Access Point (DO save config to flash)
station_cfg={}
station_cfg.ssid="test_"
station_cfg.pwd="1223334444"
station_cfg.save=true

-- ket noi voi wifi duoc thi gui "H" cho NUC rung tay cam
if (wifi.sta.config(station_cfg) == true) then
	gpio.write(pin, gpio.HIGH)
	delay(50)
	gpio.write(pin, gpio.LOW)
	delay(50)
	gpio.write(pin, gpio.HIGH)
	delay(50)
	gpio.write(pin, gpio.LOW)
	delay(50)

-- get gamepad's MAC address
mac = wifi.ap.getmac()

-- chi lay 2 byte cuoi cua MAC address:
for i = 17,13,-1
do
  physical_mac = mac[i]
end

-- khoi tao mot websocket client
local ws = websocket.createClient()

-- khoi tao cac ket noi websocket toi url
ws:on("connection", function(ws)
  print('got ws connection')
end)
ws:on("receive", function(_, msg, opcode)
  print('got message:', msg, opcode) -- opcode is 1 for text message, 2 for binary
end)
ws:on("close", function(_, status)
  print('connection closed', status)
  ws = nil -- required to Lua gc the websocket client
end)
-- Xu ly tin hieu yeu cau rung gamepad
ws:on(Gamepad_Vibrate, function(payload, length)
  print('MAC needed to vibrate: ', payload)
  if(payload == physical_mac)
	uart.write(0, "=H")
end)
ws:connect('doanncb.ddns.net:3000')

-- data can gui len: dia chi mac
-- dinh dang data chuan bi gui len server de hien len giao dien chon gamepad
data = "\""..physical_mac.."\""
ws:send(Gamepad_Info, data)

-- gui data nut nhan len server
uart.on("stroke", "\n", function(stroke)
                --print("Data received: ", data)
                --uart.write(0, data)
                if(stroke == 'U') then
					to_be_sent = "U#"..physical_mac
					ws:send(Gamepad_Data, to_be_sent)
				if(stroke == 'D') then
					to_be_sent = "D#"..physical_mac
					ws:send(Gamepad_Data, to_be_sent)
				if(stroke == 'L') then
					to_be_sent = "L#"..physical_mac
					ws:send(Gamepad_Data, to_be_sent)
				if(stroke == 'R') then
					to_be_sent = "R#"..physical_mac
					ws:send(Gamepad_Data, to_be_sent)
				if(stroke == 'O') then
					to_be_sent = "O#"..physical_mac
					ws:send(Gamepad_Data, to_be_sent)
				if(stroke == 'C') then
					to_be_sent = "C#"..physical_mac
					ws:send(Gamepad_Data, to_be_sent)
                end
)
end