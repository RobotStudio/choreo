// Code generated by protoc-gen-go. DO NOT EDIT.
// source: geometric/vector.proto

package rs_choreo_msg_geometric

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"
import choreo "github.com/RobotStudio/choreo-msg/msg/primitive"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

type Vector3Stamped struct {
	Header *choreo.Header `protobuf:"bytes,1,opt,name=header" json:"header,omitempty"`
	Vector *Vector3       `protobuf:"bytes,2,opt,name=vector" json:"vector,omitempty"`
}

func (m *Vector3Stamped) Reset()                    { *m = Vector3Stamped{} }
func (m *Vector3Stamped) String() string            { return proto.CompactTextString(m) }
func (*Vector3Stamped) ProtoMessage()               {}
func (*Vector3Stamped) Descriptor() ([]byte, []int) { return fileDescriptor8, []int{0} }

func (m *Vector3Stamped) GetHeader() *choreo.Header {
	if m != nil {
		return m.Header
	}
	return nil
}

func (m *Vector3Stamped) GetVector() *Vector3 {
	if m != nil {
		return m.Vector
	}
	return nil
}

type Vector3 struct {
	X float64 `protobuf:"fixed64,1,opt,name=x" json:"x,omitempty"`
	Y float64 `protobuf:"fixed64,2,opt,name=y" json:"y,omitempty"`
	Z float64 `protobuf:"fixed64,3,opt,name=z" json:"z,omitempty"`
}

func (m *Vector3) Reset()                    { *m = Vector3{} }
func (m *Vector3) String() string            { return proto.CompactTextString(m) }
func (*Vector3) ProtoMessage()               {}
func (*Vector3) Descriptor() ([]byte, []int) { return fileDescriptor8, []int{1} }

func (m *Vector3) GetX() float64 {
	if m != nil {
		return m.X
	}
	return 0
}

func (m *Vector3) GetY() float64 {
	if m != nil {
		return m.Y
	}
	return 0
}

func (m *Vector3) GetZ() float64 {
	if m != nil {
		return m.Z
	}
	return 0
}

func init() {
	proto.RegisterType((*Vector3Stamped)(nil), "choreo.Vector3Stamped")
	proto.RegisterType((*Vector3)(nil), "choreo.Vector3")
}

func init() { proto.RegisterFile("geometric/vector.proto", fileDescriptor8) }

var fileDescriptor8 = []byte{
	// 217 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x3c, 0x8f, 0xb1, 0x4b, 0xc4, 0x30,
	0x14, 0xc6, 0x89, 0x42, 0x84, 0x28, 0x27, 0x64, 0x38, 0x8a, 0x93, 0xdc, 0xa0, 0x2e, 0x26, 0x60,
	0x47, 0x37, 0x17, 0x75, 0xcd, 0x81, 0x83, 0x5b, 0x9b, 0x3e, 0xd2, 0x0c, 0xe1, 0x95, 0xf4, 0xdd,
	0x71, 0xed, 0x5f, 0x7f, 0x34, 0x49, 0x3b, 0x64, 0xf8, 0xbe, 0xef, 0x97, 0xef, 0xbd, 0x27, 0xf6,
	0x0e, 0x30, 0x00, 0x45, 0x6f, 0xf5, 0x19, 0x2c, 0x61, 0x54, 0x43, 0x44, 0x42, 0xc9, 0x6d, 0x8f,
	0x11, 0xf0, 0x69, 0x3f, 0x44, 0x1f, 0x3c, 0xf9, 0x33, 0xe8, 0x1e, 0x9a, 0x0e, 0x4a, 0x7e, 0x68,
	0xc4, 0xee, 0x2f, 0xf1, 0xf5, 0x91, 0x9a, 0x30, 0x40, 0x27, 0x5f, 0x04, 0xcf, 0x44, 0xc5, 0x9e,
	0xd9, 0xdb, 0xfd, 0xc7, 0x4e, 0xe5, 0x0a, 0xf5, 0x93, 0x5c, 0x53, 0x52, 0xf9, 0x2a, 0x78, 0x9e,
	0x54, 0xdd, 0x24, 0xee, 0x71, 0xe5, 0x4a, 0x9f, 0x29, 0xf1, 0xa1, 0x16, 0x77, 0xc5, 0x92, 0x0f,
	0x82, 0x5d, 0x52, 0x2d, 0x33, 0xec, 0xb2, 0xa8, 0x29, 0x7d, 0x66, 0x86, 0x4d, 0x8b, 0x9a, 0xab,
	0xdb, 0xac, 0xe6, 0xaf, 0xdf, 0xff, 0x6f, 0xe7, 0xa9, 0x3f, 0xb5, 0xca, 0x62, 0xd0, 0x06, 0x5b,
	0xa4, 0x23, 0x9d, 0x3a, 0x8f, 0x3a, 0x4f, 0x79, 0x0f, 0xa3, 0xd3, 0xcb, 0xdb, 0xee, 0xfe, 0x8c,
	0xe3, 0xba, 0x41, 0x18, 0x9d, 0xda, 0xfc, 0x96, 0xa7, 0x4b, 0xeb, 0x6b, 0x00, 0x00, 0x00, 0xff,
	0xff, 0x03, 0xda, 0x46, 0x25, 0x23, 0x01, 0x00, 0x00,
}
