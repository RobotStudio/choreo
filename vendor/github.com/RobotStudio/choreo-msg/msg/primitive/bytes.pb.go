// Code generated by protoc-gen-go. DO NOT EDIT.
// source: primitive/bytes.proto

package rs_choreo_msg_primitive

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

type Bytes struct {
	Data []byte `protobuf:"bytes,1,opt,name=data,proto3" json:"data,omitempty"`
}

func (m *Bytes) Reset()                    { *m = Bytes{} }
func (m *Bytes) String() string            { return proto.CompactTextString(m) }
func (*Bytes) ProtoMessage()               {}
func (*Bytes) Descriptor() ([]byte, []int) { return fileDescriptor1, []int{0} }

func (m *Bytes) GetData() []byte {
	if m != nil {
		return m.Data
	}
	return nil
}

func init() {
	proto.RegisterType((*Bytes)(nil), "choreo.Bytes")
}

func init() { proto.RegisterFile("primitive/bytes.proto", fileDescriptor1) }

var fileDescriptor1 = []byte{
	// 134 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0x12, 0x2d, 0x28, 0xca, 0xcc,
	0xcd, 0x2c, 0xc9, 0x2c, 0x4b, 0xd5, 0x4f, 0xaa, 0x2c, 0x49, 0x2d, 0xd6, 0x2b, 0x28, 0xca, 0x2f,
	0xc9, 0x17, 0x62, 0x4b, 0xce, 0xc8, 0x2f, 0x4a, 0xcd, 0x57, 0x92, 0xe6, 0x62, 0x75, 0x02, 0x09,
	0x0b, 0x09, 0x71, 0xb1, 0xa4, 0x24, 0x96, 0x24, 0x4a, 0x30, 0x2a, 0x30, 0x6a, 0xf0, 0x04, 0x81,
	0xd9, 0x4e, 0x9e, 0x51, 0xee, 0xe9, 0x99, 0x25, 0x19, 0xa5, 0x49, 0x7a, 0xc9, 0xf9, 0xb9, 0xfa,
	0x41, 0xf9, 0x49, 0xf9, 0x25, 0xc1, 0x25, 0xa5, 0x29, 0x99, 0xf9, 0xfa, 0x10, 0xdd, 0xba, 0xb9,
	0xc5, 0xe9, 0xfa, 0x20, 0x0c, 0xb7, 0xc3, 0xba, 0xa8, 0x58, 0x0f, 0x22, 0xa7, 0x97, 0x5b, 0x9c,
	0xae, 0x07, 0x17, 0x4f, 0x62, 0x03, 0x5b, 0x6b, 0x0c, 0x08, 0x00, 0x00, 0xff, 0xff, 0x93, 0x82,
	0x1e, 0xd2, 0x8f, 0x00, 0x00, 0x00,
}
