// Code generated by protoc-gen-go. DO NOT EDIT.
// source: sensor/joystick.proto

package rs_choreo_msg_sensor

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"
import choreo "github.com/RobotStudio/choreo-msg/msg/primitive"
import choreo1 "github.com/RobotStudio/choreo-msg/msg/primitive"
import choreo4 "github.com/RobotStudio/choreo-msg/msg/primitive"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

type JoyFeedback_FeedbackType int32

const (
	JoyFeedback_LED    JoyFeedback_FeedbackType = 0
	JoyFeedback_RUMBLE JoyFeedback_FeedbackType = 1
	JoyFeedback_BUZZER JoyFeedback_FeedbackType = 2
)

var JoyFeedback_FeedbackType_name = map[int32]string{
	0: "LED",
	1: "RUMBLE",
	2: "BUZZER",
}
var JoyFeedback_FeedbackType_value = map[string]int32{
	"LED":    0,
	"RUMBLE": 1,
	"BUZZER": 2,
}

func (x JoyFeedback_FeedbackType) String() string {
	return proto.EnumName(JoyFeedback_FeedbackType_name, int32(x))
}
func (JoyFeedback_FeedbackType) EnumDescriptor() ([]byte, []int) { return fileDescriptor6, []int{1, 0} }

type Joy struct {
	Header  *choreo1.Header   `protobuf:"bytes,1,opt,name=header" json:"header,omitempty"`
	Axes    []*choreo.Float32 `protobuf:"bytes,2,rep,name=axes" json:"axes,omitempty"`
	Buttons []*choreo4.Int32  `protobuf:"bytes,3,rep,name=buttons" json:"buttons,omitempty"`
}

func (m *Joy) Reset()                    { *m = Joy{} }
func (m *Joy) String() string            { return proto.CompactTextString(m) }
func (*Joy) ProtoMessage()               {}
func (*Joy) Descriptor() ([]byte, []int) { return fileDescriptor6, []int{0} }

func (m *Joy) GetHeader() *choreo1.Header {
	if m != nil {
		return m.Header
	}
	return nil
}

func (m *Joy) GetAxes() []*choreo.Float32 {
	if m != nil {
		return m.Axes
	}
	return nil
}

func (m *Joy) GetButtons() []*choreo4.Int32 {
	if m != nil {
		return m.Buttons
	}
	return nil
}

type JoyFeedback struct {
	Type      JoyFeedback_FeedbackType `protobuf:"varint,1,opt,name=type,enum=choreo.JoyFeedback_FeedbackType" json:"type,omitempty"`
	Id        *choreo4.UInt32          `protobuf:"bytes,2,opt,name=id" json:"id,omitempty"`
	Intensity *choreo.Float32          `protobuf:"bytes,3,opt,name=intensity" json:"intensity,omitempty"`
}

func (m *JoyFeedback) Reset()                    { *m = JoyFeedback{} }
func (m *JoyFeedback) String() string            { return proto.CompactTextString(m) }
func (*JoyFeedback) ProtoMessage()               {}
func (*JoyFeedback) Descriptor() ([]byte, []int) { return fileDescriptor6, []int{1} }

func (m *JoyFeedback) GetType() JoyFeedback_FeedbackType {
	if m != nil {
		return m.Type
	}
	return JoyFeedback_LED
}

func (m *JoyFeedback) GetId() *choreo4.UInt32 {
	if m != nil {
		return m.Id
	}
	return nil
}

func (m *JoyFeedback) GetIntensity() *choreo.Float32 {
	if m != nil {
		return m.Intensity
	}
	return nil
}

type JoyFeedbackArray struct {
	Array []*JoyFeedback `protobuf:"bytes,1,rep,name=array" json:"array,omitempty"`
}

func (m *JoyFeedbackArray) Reset()                    { *m = JoyFeedbackArray{} }
func (m *JoyFeedbackArray) String() string            { return proto.CompactTextString(m) }
func (*JoyFeedbackArray) ProtoMessage()               {}
func (*JoyFeedbackArray) Descriptor() ([]byte, []int) { return fileDescriptor6, []int{2} }

func (m *JoyFeedbackArray) GetArray() []*JoyFeedback {
	if m != nil {
		return m.Array
	}
	return nil
}

func init() {
	proto.RegisterType((*Joy)(nil), "choreo.Joy")
	proto.RegisterType((*JoyFeedback)(nil), "choreo.JoyFeedback")
	proto.RegisterType((*JoyFeedbackArray)(nil), "choreo.JoyFeedbackArray")
	proto.RegisterEnum("choreo.JoyFeedback_FeedbackType", JoyFeedback_FeedbackType_name, JoyFeedback_FeedbackType_value)
}

func init() { proto.RegisterFile("sensor/joystick.proto", fileDescriptor6) }

var fileDescriptor6 = []byte{
	// 357 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x6c, 0x92, 0xcf, 0x4e, 0xf2, 0x40,
	0x14, 0xc5, 0xbf, 0xb6, 0x7c, 0x25, 0x5e, 0x14, 0x9b, 0x21, 0x98, 0x86, 0x85, 0x21, 0x35, 0x51,
	0x5c, 0xd0, 0x26, 0xc5, 0x9d, 0x71, 0x01, 0x0a, 0x51, 0x82, 0x9b, 0x2a, 0x1b, 0x76, 0xfd, 0x33,
	0xc2, 0x88, 0xed, 0x34, 0x33, 0x83, 0xb1, 0xf1, 0xf1, 0x7c, 0x31, 0xd3, 0x19, 0x1a, 0x30, 0xba,
	0x68, 0x72, 0x73, 0xce, 0xef, 0xf6, 0x9c, 0x76, 0x06, 0xda, 0x1c, 0x67, 0x9c, 0x32, 0xef, 0x95,
	0x16, 0x5c, 0x90, 0x78, 0xed, 0xe6, 0x8c, 0x0a, 0x8a, 0xcc, 0x78, 0x45, 0x19, 0xa6, 0x9d, 0x76,
	0xce, 0x48, 0x4a, 0x04, 0x79, 0xc7, 0xde, 0xcb, 0x1b, 0x0d, 0x85, 0xb2, 0x3b, 0x27, 0x3b, 0x79,
	0x85, 0xc3, 0x04, 0xb3, 0xad, 0xde, 0xda, 0xe9, 0x24, 0xdb, 0xc2, 0xce, 0x27, 0x18, 0x53, 0x5a,
	0xa0, 0x73, 0x30, 0x15, 0x6b, 0x6b, 0x5d, 0xad, 0xd7, 0xf0, 0x9b, 0xae, 0xca, 0x70, 0xef, 0xa5,
	0x1a, 0x6c, 0x5d, 0x74, 0x06, 0xb5, 0xf0, 0x03, 0x73, 0x5b, 0xef, 0x1a, 0xbd, 0x86, 0x7f, 0x5c,
	0x51, 0x93, 0x32, 0x7e, 0xe0, 0x07, 0xd2, 0x44, 0x17, 0x50, 0x8f, 0x36, 0x42, 0xd0, 0x8c, 0xdb,
	0x86, 0xe4, 0x8e, 0x2a, 0xee, 0x21, 0x2b, 0xa9, 0xca, 0x75, 0xbe, 0x34, 0x68, 0x4c, 0x69, 0x31,
	0xc1, 0x38, 0x89, 0xc2, 0x78, 0x8d, 0xae, 0xa0, 0x26, 0x8a, 0x1c, 0xcb, 0x0e, 0x4d, 0xbf, 0x5b,
	0x6d, 0xed, 0x21, 0x6e, 0x35, 0x3c, 0x17, 0x39, 0x0e, 0x24, 0x8d, 0x4e, 0x41, 0x27, 0x89, 0xad,
	0xff, 0xec, 0x3d, 0x57, 0x51, 0x3a, 0x49, 0x50, 0x1f, 0x0e, 0x48, 0x26, 0x70, 0xc6, 0x89, 0x28,
	0x6c, 0x43, 0x62, 0xbf, 0x8a, 0xef, 0x08, 0xc7, 0x83, 0xc3, 0xfd, 0x10, 0x54, 0x07, 0x63, 0x36,
	0xbe, 0xb3, 0xfe, 0x21, 0x00, 0x33, 0x98, 0x3f, 0x8e, 0x66, 0x63, 0x4b, 0x2b, 0xe7, 0xd1, 0x7c,
	0xb1, 0x18, 0x07, 0x96, 0xee, 0xdc, 0x80, 0xb5, 0xd7, 0x70, 0xc8, 0x58, 0x58, 0xa0, 0x4b, 0xf8,
	0x1f, 0x96, 0x83, 0xad, 0xc9, 0x1f, 0xd0, 0xfa, 0xe3, 0x53, 0x02, 0x45, 0x8c, 0x6e, 0x17, 0xc3,
	0x25, 0x11, 0xab, 0x4d, 0xe4, 0xc6, 0x34, 0xf5, 0x02, 0x1a, 0x51, 0xf1, 0x24, 0x36, 0x09, 0xa1,
	0x9e, 0xda, 0xe9, 0xa7, 0x7c, 0xe9, 0x95, 0x8f, 0xba, 0x0c, 0xd7, 0x8c, 0x57, 0x2f, 0x4b, 0xf9,
	0xd2, 0x55, 0x62, 0x64, 0xca, 0xd3, 0x1c, 0x7c, 0x07, 0x00, 0x00, 0xff, 0xff, 0xeb, 0xc4, 0x71,
	0x19, 0x32, 0x02, 0x00, 0x00,
}
