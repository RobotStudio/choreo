// Code generated by protoc-gen-go. DO NOT EDIT.
// source: sensor/battery.proto

/*
Package msg is a generated protocol buffer package.

It is generated from these files:
	sensor/battery.proto

It has these top-level messages:
	BatteryState
*/
package msg

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"
import choreo "github.com/RobotStudio/choreo-msg/msg"
import choreo1 "github.com/RobotStudio/choreo-msg/msg"
import choreo2 "github.com/RobotStudio/choreo-msg/msg"
import choreo3 "github.com/RobotStudio/choreo-msg/msg"
import choreo4 "github.com/RobotStudio/choreo-msg/msg"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

type BatteryState_Status int32

const (
	BatteryState_STATUS_UNKNOWN      BatteryState_Status = 0
	BatteryState_STATUS_CHARGING     BatteryState_Status = 1
	BatteryState_STATUS_DISCHARGING  BatteryState_Status = 2
	BatteryState_STATUS_NOT_CHARGING BatteryState_Status = 3
	BatteryState_STATUS_FULL         BatteryState_Status = 4
)

var BatteryState_Status_name = map[int32]string{
	0: "STATUS_UNKNOWN",
	1: "STATUS_CHARGING",
	2: "STATUS_DISCHARGING",
	3: "STATUS_NOT_CHARGING",
	4: "STATUS_FULL",
}
var BatteryState_Status_value = map[string]int32{
	"STATUS_UNKNOWN":      0,
	"STATUS_CHARGING":     1,
	"STATUS_DISCHARGING":  2,
	"STATUS_NOT_CHARGING": 3,
	"STATUS_FULL":         4,
}

func (x BatteryState_Status) String() string {
	return proto.EnumName(BatteryState_Status_name, int32(x))
}
func (BatteryState_Status) EnumDescriptor() ([]byte, []int) { return fileDescriptor0, []int{0, 0} }

type BatteryState_Health int32

const (
	BatteryState_HEALTH_UNKNOWN               BatteryState_Health = 0
	BatteryState_HEALTH_GOOD                  BatteryState_Health = 1
	BatteryState_HEALTH_OVERHEAT              BatteryState_Health = 2
	BatteryState_HEALTH_DEAD                  BatteryState_Health = 3
	BatteryState_HEALTH_OVERVOLTAGE           BatteryState_Health = 4
	BatteryState_HEALTH_UNSPEC_FAILURE        BatteryState_Health = 5
	BatteryState_HEALTH_COLD                  BatteryState_Health = 6
	BatteryState_HEALTH_WATCHDOG_TIMER_EXPIRE BatteryState_Health = 7
	BatteryState_HEALTH_SAFETY_TIMER_EXPIRE   BatteryState_Health = 8
)

var BatteryState_Health_name = map[int32]string{
	0: "HEALTH_UNKNOWN",
	1: "HEALTH_GOOD",
	2: "HEALTH_OVERHEAT",
	3: "HEALTH_DEAD",
	4: "HEALTH_OVERVOLTAGE",
	5: "HEALTH_UNSPEC_FAILURE",
	6: "HEALTH_COLD",
	7: "HEALTH_WATCHDOG_TIMER_EXPIRE",
	8: "HEALTH_SAFETY_TIMER_EXPIRE",
}
var BatteryState_Health_value = map[string]int32{
	"HEALTH_UNKNOWN":               0,
	"HEALTH_GOOD":                  1,
	"HEALTH_OVERHEAT":              2,
	"HEALTH_DEAD":                  3,
	"HEALTH_OVERVOLTAGE":           4,
	"HEALTH_UNSPEC_FAILURE":        5,
	"HEALTH_COLD":                  6,
	"HEALTH_WATCHDOG_TIMER_EXPIRE": 7,
	"HEALTH_SAFETY_TIMER_EXPIRE":   8,
}

func (x BatteryState_Health) String() string {
	return proto.EnumName(BatteryState_Health_name, int32(x))
}
func (BatteryState_Health) EnumDescriptor() ([]byte, []int) { return fileDescriptor0, []int{0, 1} }

type BatteryState_Technology int32

const (
	BatteryState_TECHNOLOGY_UNKNOWN BatteryState_Technology = 0
	BatteryState_TECHNOLOGY_NIMH    BatteryState_Technology = 1
	BatteryState_TECHNOLOGY_LION    BatteryState_Technology = 2
	BatteryState_TECHNOLOGY_LIPO    BatteryState_Technology = 3
	BatteryState_TECHNOLOGY_LIFE    BatteryState_Technology = 4
	BatteryState_TECHNOLOGY_NICD    BatteryState_Technology = 5
	BatteryState_TECHNOLOGY_LIMN    BatteryState_Technology = 6
)

var BatteryState_Technology_name = map[int32]string{
	0: "TECHNOLOGY_UNKNOWN",
	1: "TECHNOLOGY_NIMH",
	2: "TECHNOLOGY_LION",
	3: "TECHNOLOGY_LIPO",
	4: "TECHNOLOGY_LIFE",
	5: "TECHNOLOGY_NICD",
	6: "TECHNOLOGY_LIMN",
}
var BatteryState_Technology_value = map[string]int32{
	"TECHNOLOGY_UNKNOWN": 0,
	"TECHNOLOGY_NIMH":    1,
	"TECHNOLOGY_LION":    2,
	"TECHNOLOGY_LIPO":    3,
	"TECHNOLOGY_LIFE":    4,
	"TECHNOLOGY_NICD":    5,
	"TECHNOLOGY_LIMN":    6,
}

func (x BatteryState_Technology) String() string {
	return proto.EnumName(BatteryState_Technology_name, int32(x))
}
func (BatteryState_Technology) EnumDescriptor() ([]byte, []int) { return fileDescriptor0, []int{0, 2} }

type BatteryState struct {
	Status                BatteryState_Status     `protobuf:"varint,1,opt,name=status,enum=choreo.BatteryState_Status" json:"status,omitempty"`
	Health                BatteryState_Health     `protobuf:"varint,2,opt,name=health,enum=choreo.BatteryState_Health" json:"health,omitempty"`
	Technology            BatteryState_Technology `protobuf:"varint,3,opt,name=technology,enum=choreo.BatteryState_Technology" json:"technology,omitempty"`
	Header                *choreo2.Header         `protobuf:"bytes,4,opt,name=header" json:"header,omitempty"`
	Voltage               *choreo1.Float32        `protobuf:"bytes,5,opt,name=voltage" json:"voltage,omitempty"`
	Current               *choreo1.Float32        `protobuf:"bytes,6,opt,name=current" json:"current,omitempty"`
	Charge                *choreo1.Float32        `protobuf:"bytes,7,opt,name=charge" json:"charge,omitempty"`
	Capacity              *choreo1.Float32        `protobuf:"bytes,8,opt,name=capacity" json:"capacity,omitempty"`
	DesignCapacity        *choreo1.Float32        `protobuf:"bytes,9,opt,name=design_capacity,json=designCapacity" json:"design_capacity,omitempty"`
	Percentage            *choreo1.Float32        `protobuf:"bytes,10,opt,name=percentage" json:"percentage,omitempty"`
	PowerSupplyStatus     *choreo3.UInt32         `protobuf:"bytes,12,opt,name=power_supply_status,json=powerSupplyStatus" json:"power_supply_status,omitempty"`
	PowerSupplyHealth     *choreo3.UInt32         `protobuf:"bytes,13,opt,name=power_supply_health,json=powerSupplyHealth" json:"power_supply_health,omitempty"`
	PowerSupplyTechnology *choreo3.UInt32         `protobuf:"bytes,14,opt,name=power_supply_technology,json=powerSupplyTechnology" json:"power_supply_technology,omitempty"`
	Present               *choreo.Bool            `protobuf:"bytes,15,opt,name=present" json:"present,omitempty"`
	CellVoltage           *choreo1.Float32        `protobuf:"bytes,16,opt,name=cell_voltage,json=cellVoltage" json:"cell_voltage,omitempty"`
	Location              *choreo4.String         `protobuf:"bytes,17,opt,name=location" json:"location,omitempty"`
	SerialNumber          *choreo4.String         `protobuf:"bytes,18,opt,name=serial_number,json=serialNumber" json:"serial_number,omitempty"`
}

func (m *BatteryState) Reset()                    { *m = BatteryState{} }
func (m *BatteryState) String() string            { return proto.CompactTextString(m) }
func (*BatteryState) ProtoMessage()               {}
func (*BatteryState) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{0} }

func (m *BatteryState) GetStatus() BatteryState_Status {
	if m != nil {
		return m.Status
	}
	return BatteryState_STATUS_UNKNOWN
}

func (m *BatteryState) GetHealth() BatteryState_Health {
	if m != nil {
		return m.Health
	}
	return BatteryState_HEALTH_UNKNOWN
}

func (m *BatteryState) GetTechnology() BatteryState_Technology {
	if m != nil {
		return m.Technology
	}
	return BatteryState_TECHNOLOGY_UNKNOWN
}

func (m *BatteryState) GetHeader() *choreo2.Header {
	if m != nil {
		return m.Header
	}
	return nil
}

func (m *BatteryState) GetVoltage() *choreo1.Float32 {
	if m != nil {
		return m.Voltage
	}
	return nil
}

func (m *BatteryState) GetCurrent() *choreo1.Float32 {
	if m != nil {
		return m.Current
	}
	return nil
}

func (m *BatteryState) GetCharge() *choreo1.Float32 {
	if m != nil {
		return m.Charge
	}
	return nil
}

func (m *BatteryState) GetCapacity() *choreo1.Float32 {
	if m != nil {
		return m.Capacity
	}
	return nil
}

func (m *BatteryState) GetDesignCapacity() *choreo1.Float32 {
	if m != nil {
		return m.DesignCapacity
	}
	return nil
}

func (m *BatteryState) GetPercentage() *choreo1.Float32 {
	if m != nil {
		return m.Percentage
	}
	return nil
}

func (m *BatteryState) GetPowerSupplyStatus() *choreo3.UInt32 {
	if m != nil {
		return m.PowerSupplyStatus
	}
	return nil
}

func (m *BatteryState) GetPowerSupplyHealth() *choreo3.UInt32 {
	if m != nil {
		return m.PowerSupplyHealth
	}
	return nil
}

func (m *BatteryState) GetPowerSupplyTechnology() *choreo3.UInt32 {
	if m != nil {
		return m.PowerSupplyTechnology
	}
	return nil
}

func (m *BatteryState) GetPresent() *choreo.Bool {
	if m != nil {
		return m.Present
	}
	return nil
}

func (m *BatteryState) GetCellVoltage() *choreo1.Float32 {
	if m != nil {
		return m.CellVoltage
	}
	return nil
}

func (m *BatteryState) GetLocation() *choreo4.String {
	if m != nil {
		return m.Location
	}
	return nil
}

func (m *BatteryState) GetSerialNumber() *choreo4.String {
	if m != nil {
		return m.SerialNumber
	}
	return nil
}

func init() {
	proto.RegisterType((*BatteryState)(nil), "choreo.BatteryState")
	proto.RegisterEnum("choreo.BatteryState_Status", BatteryState_Status_name, BatteryState_Status_value)
	proto.RegisterEnum("choreo.BatteryState_Health", BatteryState_Health_name, BatteryState_Health_value)
	proto.RegisterEnum("choreo.BatteryState_Technology", BatteryState_Technology_name, BatteryState_Technology_value)
}

func init() { proto.RegisterFile("sensor/battery.proto", fileDescriptor0) }

var fileDescriptor0 = []byte{
	// 736 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x84, 0x94, 0x61, 0x8f, 0xe2, 0x44,
	0x18, 0xc7, 0x05, 0x76, 0x0b, 0x3e, 0x70, 0xd0, 0x1b, 0x6e, 0xf7, 0xea, 0x6a, 0x74, 0xc3, 0x0b,
	0xbd, 0xf3, 0x22, 0x24, 0xf0, 0xc6, 0xc4, 0x44, 0xd3, 0x83, 0x42, 0x1b, 0xbb, 0xed, 0xa6, 0x2d,
	0x7b, 0x9e, 0x6f, 0x9a, 0x52, 0xc6, 0xd2, 0xa4, 0x74, 0x9a, 0xe9, 0xb0, 0x86, 0xaf, 0xe3, 0xb7,
	0xf2, 0x73, 0xf8, 0x05, 0x4c, 0xdb, 0x01, 0x8a, 0x54, 0x7d, 0xfb, 0x7b, 0x7e, 0xff, 0xe9, 0x33,
	0xcf, 0x3c, 0x00, 0xaf, 0x52, 0x1c, 0xa7, 0x84, 0x8e, 0x56, 0x1e, 0x63, 0x98, 0xee, 0x87, 0x09,
	0x25, 0x8c, 0x20, 0xc1, 0xdf, 0x10, 0x8a, 0xc9, 0xdd, 0xab, 0x84, 0x86, 0xdb, 0x90, 0x85, 0xcf,
	0x78, 0xb4, 0x22, 0x24, 0x2a, 0xaa, 0x77, 0x37, 0x27, 0xfa, 0x5b, 0x44, 0x3c, 0xc6, 0xf1, 0xed,
	0x09, 0x6f, 0xb0, 0xb7, 0xc6, 0x94, 0xf3, 0xfe, 0x89, 0x87, 0x71, 0x85, 0x9c, 0x32, 0x1a, 0xc6,
	0x41, 0xc1, 0x07, 0x7f, 0x01, 0x74, 0xde, 0x17, 0xbd, 0xd8, 0xcc, 0x63, 0x18, 0x4d, 0x40, 0x48,
	0x99, 0xc7, 0x76, 0xa9, 0x54, 0xbb, 0xaf, 0xbd, 0xe9, 0x8e, 0x3f, 0x1f, 0x16, 0xbd, 0x0d, 0xcb,
	0xd6, 0xd0, 0xce, 0x15, 0x8b, 0xab, 0x59, 0x68, 0x83, 0xbd, 0x88, 0x6d, 0xa4, 0xfa, 0x7f, 0x84,
	0xd4, 0x5c, 0xb1, 0xb8, 0x8a, 0x7e, 0x02, 0x60, 0xd8, 0xdf, 0xc4, 0x24, 0x22, 0xc1, 0x5e, 0x6a,
	0xe4, 0xc1, 0xaf, 0x2a, 0x83, 0xce, 0x51, 0xb3, 0x4a, 0x11, 0xf4, 0x75, 0xfe, 0xd5, 0x35, 0xa6,
	0xd2, 0xd5, 0x7d, 0xed, 0x4d, 0x7b, 0xdc, 0x3d, 0x84, 0xd5, 0x9c, 0x5a, 0xbc, 0x8a, 0xde, 0x42,
	0xf3, 0x99, 0x44, 0xcc, 0x0b, 0xb0, 0x74, 0x9d, 0x8b, 0xbd, 0x83, 0x38, 0xcf, 0xc6, 0x39, 0x19,
	0x5b, 0x87, 0x7a, 0xa6, 0xfa, 0x3b, 0x4a, 0x71, 0xcc, 0x24, 0xe1, 0x5f, 0x54, 0x5e, 0x47, 0xdf,
	0x80, 0xe0, 0x6f, 0x3c, 0x1a, 0x60, 0xa9, 0x59, 0x6d, 0xf2, 0x32, 0x7a, 0x07, 0x2d, 0xdf, 0x4b,
	0x3c, 0x3f, 0x64, 0x7b, 0xa9, 0x55, 0xad, 0x1e, 0x05, 0xf4, 0x3d, 0xf4, 0xd6, 0x38, 0x0d, 0x83,
	0xd8, 0x3d, 0x66, 0x3e, 0xad, 0xce, 0x74, 0x0b, 0x6f, 0x7a, 0x48, 0x8e, 0x00, 0x12, 0x4c, 0x7d,
	0x1c, 0xe7, 0x17, 0x85, 0xea, 0x50, 0x49, 0x41, 0x3f, 0x42, 0x3f, 0x21, 0xbf, 0x63, 0xea, 0xa6,
	0xbb, 0x24, 0x89, 0xf6, 0x2e, 0x7f, 0xf6, 0xce, 0xf9, 0x2c, 0x97, 0x5a, 0x9c, 0x05, 0x5f, 0xe6,
	0xaa, 0x9d, 0x9b, 0xc5, 0xe3, 0x5f, 0xe4, 0xf9, 0x06, 0xbc, 0xf8, 0xdf, 0x7c, 0xb1, 0x07, 0x68,
	0x0e, 0xaf, 0xcf, 0xf2, 0xa5, 0x65, 0xe8, 0x56, 0x9e, 0x71, 0x53, 0x3a, 0xc3, 0x29, 0xaf, 0x41,
	0x33, 0xa1, 0x38, 0xcd, 0xde, 0xac, 0x97, 0xe7, 0x3a, 0xc7, 0x25, 0x22, 0x24, 0xb2, 0x0e, 0x45,
	0x34, 0x86, 0x8e, 0x8f, 0xa3, 0xc8, 0x3d, 0xec, 0x82, 0x58, 0x3d, 0xa2, 0x76, 0x26, 0x3d, 0xf1,
	0x7d, 0xf8, 0x16, 0x5a, 0x11, 0xf1, 0x3d, 0x16, 0x92, 0x58, 0x7a, 0x79, 0xde, 0x94, 0x9d, 0xff,
	0x8c, 0xac, 0x63, 0x1d, 0x4d, 0xe0, 0x45, 0x8a, 0x69, 0xe8, 0x45, 0x6e, 0xbc, 0xdb, 0xae, 0x30,
	0x95, 0x50, 0x65, 0xa0, 0x53, 0x48, 0x46, 0xee, 0x0c, 0x52, 0x10, 0xf8, 0x38, 0x11, 0x74, 0x6d,
	0x47, 0x76, 0x96, 0xb6, 0xbb, 0x34, 0x7e, 0x36, 0xcc, 0x0f, 0x86, 0xf8, 0x09, 0xea, 0x43, 0x8f,
	0xb3, 0xa9, 0x2a, 0x5b, 0x0b, 0xcd, 0x58, 0x88, 0x35, 0x74, 0x0b, 0x88, 0xc3, 0x99, 0x66, 0x1f,
	0x79, 0x1d, 0xbd, 0x86, 0x3e, 0xe7, 0x86, 0xe9, 0x9c, 0x02, 0x0d, 0xd4, 0x83, 0x36, 0x2f, 0xcc,
	0x97, 0xba, 0x2e, 0x5e, 0x0d, 0xfe, 0xac, 0x81, 0xc0, 0x1f, 0x01, 0x41, 0x57, 0x55, 0x64, 0xdd,
	0x51, 0x4b, 0x5f, 0xed, 0x41, 0x9b, 0xb3, 0x85, 0x69, 0xce, 0xc4, 0x5a, 0xd6, 0x06, 0x07, 0xe6,
	0x93, 0x62, 0xa9, 0x8a, 0xec, 0x88, 0xf5, 0x92, 0x35, 0x53, 0xe4, 0x99, 0xd8, 0xc8, 0xfa, 0x2a,
	0x59, 0x4f, 0xa6, 0xee, 0xc8, 0x0b, 0x45, 0xbc, 0x42, 0x9f, 0xc1, 0xcd, 0xf1, 0x13, 0xf6, 0xa3,
	0x32, 0x75, 0xe7, 0xb2, 0xa6, 0x2f, 0x2d, 0x45, 0xbc, 0x2e, 0x9d, 0x31, 0x35, 0xf5, 0x99, 0x28,
	0xa0, 0x7b, 0xf8, 0x82, 0x83, 0x0f, 0xb2, 0x33, 0x55, 0x67, 0xe6, 0xc2, 0x75, 0xb4, 0x07, 0xc5,
	0x72, 0x95, 0x5f, 0x1e, 0x35, 0x4b, 0x11, 0x9b, 0xe8, 0x4b, 0xb8, 0xe3, 0x86, 0x2d, 0xcf, 0x15,
	0xe7, 0xe3, 0x79, 0xbd, 0x35, 0xf8, 0xa3, 0x06, 0x50, 0x5a, 0x8e, 0x5b, 0x40, 0x8e, 0x32, 0x55,
	0x0d, 0x53, 0x37, 0x17, 0x1f, 0xcf, 0x27, 0x5b, 0xe2, 0x86, 0xf6, 0xa0, 0x16, 0xf7, 0x2c, 0x41,
	0x5d, 0x33, 0x0d, 0xb1, 0x7e, 0x01, 0x1f, 0x4d, 0xb1, 0x71, 0x01, 0xe7, 0xd9, 0x45, 0xff, 0x79,
	0xe6, 0x74, 0x26, 0x5e, 0x5f, 0x98, 0x0f, 0x86, 0x28, 0xbc, 0x7f, 0xf7, 0xeb, 0xdb, 0x20, 0x64,
	0x9b, 0xdd, 0x6a, 0xe8, 0x93, 0xed, 0xc8, 0x22, 0x2b, 0xc2, 0x6c, 0xb6, 0x5b, 0x87, 0x64, 0x54,
	0xec, 0xca, 0x77, 0xdb, 0x34, 0x18, 0x6d, 0xd3, 0xe0, 0x87, 0x6d, 0x1a, 0xac, 0x84, 0xfc, 0x9f,
	0x7a, 0xf2, 0x77, 0x00, 0x00, 0x00, 0xff, 0xff, 0xdf, 0x6e, 0x6d, 0x06, 0x3b, 0x06, 0x00, 0x00,
}
