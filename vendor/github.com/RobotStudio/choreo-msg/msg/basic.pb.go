// Code generated by protoc-gen-go. DO NOT EDIT.
// source: sensor/basic.proto

package msg

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"
import google_protobuf "github.com/golang/protobuf/ptypes/timestamp"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

type FluidPressure struct {
	Header        *Header  `protobuf:"bytes,1,opt,name=header" json:"header,omitempty"`
	FluidPressure *Float64 `protobuf:"bytes,2,opt,name=fluid_pressure,json=fluidPressure" json:"fluid_pressure,omitempty"`
	Variance      *Float64 `protobuf:"bytes,3,opt,name=variance" json:"variance,omitempty"`
}

func (m *FluidPressure) Reset()                    { *m = FluidPressure{} }
func (m *FluidPressure) String() string            { return proto.CompactTextString(m) }
func (*FluidPressure) ProtoMessage()               {}
func (*FluidPressure) Descriptor() ([]byte, []int) { return fileDescriptor21, []int{0} }

func (m *FluidPressure) GetHeader() *Header {
	if m != nil {
		return m.Header
	}
	return nil
}

func (m *FluidPressure) GetFluidPressure() *Float64 {
	if m != nil {
		return m.FluidPressure
	}
	return nil
}

func (m *FluidPressure) GetVariance() *Float64 {
	if m != nil {
		return m.Variance
	}
	return nil
}

type Illuminance struct {
	Header      *Header  `protobuf:"bytes,1,opt,name=header" json:"header,omitempty"`
	Illuminance *Float64 `protobuf:"bytes,2,opt,name=illuminance" json:"illuminance,omitempty"`
	Variance    *Float64 `protobuf:"bytes,3,opt,name=variance" json:"variance,omitempty"`
}

func (m *Illuminance) Reset()                    { *m = Illuminance{} }
func (m *Illuminance) String() string            { return proto.CompactTextString(m) }
func (*Illuminance) ProtoMessage()               {}
func (*Illuminance) Descriptor() ([]byte, []int) { return fileDescriptor21, []int{1} }

func (m *Illuminance) GetHeader() *Header {
	if m != nil {
		return m.Header
	}
	return nil
}

func (m *Illuminance) GetIlluminance() *Float64 {
	if m != nil {
		return m.Illuminance
	}
	return nil
}

func (m *Illuminance) GetVariance() *Float64 {
	if m != nil {
		return m.Variance
	}
	return nil
}

type Humidity struct {
	Header           *Header  `protobuf:"bytes,1,opt,name=header" json:"header,omitempty"`
	RelativeHumidity *Float64 `protobuf:"bytes,2,opt,name=relative_humidity,json=relativeHumidity" json:"relative_humidity,omitempty"`
	Variance         *Float64 `protobuf:"bytes,3,opt,name=variance" json:"variance,omitempty"`
}

func (m *Humidity) Reset()                    { *m = Humidity{} }
func (m *Humidity) String() string            { return proto.CompactTextString(m) }
func (*Humidity) ProtoMessage()               {}
func (*Humidity) Descriptor() ([]byte, []int) { return fileDescriptor21, []int{2} }

func (m *Humidity) GetHeader() *Header {
	if m != nil {
		return m.Header
	}
	return nil
}

func (m *Humidity) GetRelativeHumidity() *Float64 {
	if m != nil {
		return m.RelativeHumidity
	}
	return nil
}

func (m *Humidity) GetVariance() *Float64 {
	if m != nil {
		return m.Variance
	}
	return nil
}

type Temperature struct {
	Header      *Header  `protobuf:"bytes,1,opt,name=header" json:"header,omitempty"`
	Temperature *Float64 `protobuf:"bytes,2,opt,name=temperature" json:"temperature,omitempty"`
	Variance    *Float64 `protobuf:"bytes,3,opt,name=variance" json:"variance,omitempty"`
}

func (m *Temperature) Reset()                    { *m = Temperature{} }
func (m *Temperature) String() string            { return proto.CompactTextString(m) }
func (*Temperature) ProtoMessage()               {}
func (*Temperature) Descriptor() ([]byte, []int) { return fileDescriptor21, []int{3} }

func (m *Temperature) GetHeader() *Header {
	if m != nil {
		return m.Header
	}
	return nil
}

func (m *Temperature) GetTemperature() *Float64 {
	if m != nil {
		return m.Temperature
	}
	return nil
}

func (m *Temperature) GetVariance() *Float64 {
	if m != nil {
		return m.Variance
	}
	return nil
}

type TimeReference struct {
	Header  *Header                    `protobuf:"bytes,1,opt,name=header" json:"header,omitempty"`
	TimeRef *google_protobuf.Timestamp `protobuf:"bytes,2,opt,name=time_ref,json=timeRef" json:"time_ref,omitempty"`
	Source  *String                    `protobuf:"bytes,3,opt,name=source" json:"source,omitempty"`
}

func (m *TimeReference) Reset()                    { *m = TimeReference{} }
func (m *TimeReference) String() string            { return proto.CompactTextString(m) }
func (*TimeReference) ProtoMessage()               {}
func (*TimeReference) Descriptor() ([]byte, []int) { return fileDescriptor21, []int{4} }

func (m *TimeReference) GetHeader() *Header {
	if m != nil {
		return m.Header
	}
	return nil
}

func (m *TimeReference) GetTimeRef() *google_protobuf.Timestamp {
	if m != nil {
		return m.TimeRef
	}
	return nil
}

func (m *TimeReference) GetSource() *String {
	if m != nil {
		return m.Source
	}
	return nil
}

func init() {
	proto.RegisterType((*FluidPressure)(nil), "choreo.FluidPressure")
	proto.RegisterType((*Illuminance)(nil), "choreo.Illuminance")
	proto.RegisterType((*Humidity)(nil), "choreo.Humidity")
	proto.RegisterType((*Temperature)(nil), "choreo.Temperature")
	proto.RegisterType((*TimeReference)(nil), "choreo.TimeReference")
}

func init() { proto.RegisterFile("sensor/basic.proto", fileDescriptor21) }

var fileDescriptor21 = []byte{
	// 377 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x94, 0x93, 0x4b, 0x4b, 0xfb, 0x40,
	0x14, 0xc5, 0xc9, 0xff, 0x0f, 0xb5, 0x4c, 0x68, 0xd5, 0x80, 0x52, 0xba, 0x51, 0xba, 0x10, 0xa5,
	0x98, 0x50, 0x1f, 0xdd, 0xe8, 0xca, 0x45, 0xa9, 0x3b, 0x49, 0xbb, 0x72, 0x53, 0x26, 0xc9, 0x4d,
	0x72, 0x21, 0x93, 0x09, 0xf3, 0x28, 0xf8, 0x41, 0x74, 0xa5, 0xdf, 0x55, 0xf2, 0x6c, 0x45, 0x0b,
	0xcd, 0x32, 0x27, 0xe7, 0xdc, 0xfb, 0x63, 0x2e, 0x87, 0x58, 0x12, 0x52, 0xc9, 0x85, 0xe3, 0x51,
	0x89, 0xbe, 0x9d, 0x09, 0xae, 0xb8, 0xd5, 0xf1, 0x63, 0x2e, 0x80, 0x0f, 0xcf, 0x22, 0xce, 0xa3,
	0x04, 0x9c, 0x42, 0xf5, 0x74, 0xe8, 0x28, 0x64, 0x20, 0x15, 0x65, 0x59, 0x69, 0x1c, 0x9e, 0x64,
	0x02, 0x19, 0x2a, 0x5c, 0x83, 0x13, 0x26, 0x9c, 0xaa, 0x4a, 0x3e, 0xdd, 0xc8, 0x31, 0xd0, 0x00,
	0xc4, 0x6f, 0x5d, 0x2a, 0x81, 0x69, 0x54, 0xea, 0xa3, 0x4f, 0x83, 0xf4, 0x66, 0x89, 0xc6, 0xe0,
	0x45, 0x80, 0x94, 0x5a, 0x80, 0x75, 0x41, 0x3a, 0x65, 0x72, 0x60, 0x9c, 0x1b, 0x97, 0xe6, 0x4d,
	0xdf, 0x2e, 0x91, 0xec, 0x79, 0xa1, 0xba, 0xd5, 0x5f, 0x6b, 0x4a, 0xfa, 0x61, 0x1e, 0x5c, 0x65,
	0x55, 0x72, 0xf0, 0xaf, 0xf0, 0x1f, 0xd6, 0xfe, 0x59, 0x8e, 0x35, 0xbd, 0x73, 0x7b, 0xe1, 0x8f,
	0xf9, 0x63, 0xd2, 0x5d, 0x53, 0x81, 0x34, 0xf5, 0x61, 0xf0, 0xff, 0xef, 0x44, 0x63, 0x18, 0xbd,
	0x1b, 0xc4, 0x7c, 0x4e, 0x12, 0xcd, 0x30, 0xcd, 0xbf, 0xf7, 0x86, 0x9b, 0x10, 0x13, 0x37, 0xb1,
	0x5d, 0x64, 0xdb, 0x9e, 0x76, 0x5c, 0x5f, 0x06, 0xe9, 0xce, 0x35, 0xc3, 0x00, 0xd5, 0xdb, 0xde,
	0x50, 0x8f, 0xe4, 0x58, 0x40, 0x42, 0xf3, 0x23, 0xac, 0xe2, 0x2a, 0xbc, 0x0b, 0xed, 0xa8, 0x76,
	0x36, 0x5b, 0x5a, 0xbf, 0xdb, 0x12, 0x58, 0x06, 0x82, 0xaa, 0x36, 0x47, 0x9d, 0x10, 0x53, 0x6d,
	0x62, 0x3b, 0xdf, 0x6d, 0xcb, 0xd3, 0x8e, 0xeb, 0xc3, 0x20, 0xbd, 0x25, 0x32, 0x70, 0x21, 0x04,
	0x01, 0x6d, 0x2e, 0x7a, 0x4f, 0xba, 0x79, 0x05, 0x56, 0x02, 0xc2, 0x0a, 0x6b, 0x68, 0x97, 0x1d,
	0xb1, 0xeb, 0x8e, 0xd8, 0xcb, 0xba, 0x23, 0xee, 0x81, 0x2a, 0x97, 0xe4, 0xe3, 0x25, 0xd7, 0xa2,
	0x61, 0x6b, 0xc6, 0x2f, 0x8a, 0x16, 0xb8, 0xd5, 0xdf, 0xa7, 0xf1, 0xeb, 0x55, 0x84, 0x2a, 0xd6,
	0x9e, 0xed, 0x73, 0xe6, 0xb8, 0xdc, 0xe3, 0x6a, 0xa1, 0x74, 0x80, 0xdc, 0x29, 0xfd, 0xd7, 0x4c,
	0x46, 0x0e, 0x93, 0xd1, 0x03, 0x93, 0x91, 0xd7, 0x29, 0x36, 0xde, 0x7e, 0x07, 0x00, 0x00, 0xff,
	0xff, 0x4c, 0xc0, 0x0f, 0x6d, 0xc1, 0x03, 0x00, 0x00,
}