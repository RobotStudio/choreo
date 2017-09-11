// Code generated by protoc-gen-go. DO NOT EDIT.
// source: geometric/pose.proto

package msg

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

type PoseStamped struct {
	Header *Header `protobuf:"bytes,1,opt,name=header" json:"header,omitempty"`
	Pose   *Pose   `protobuf:"bytes,2,opt,name=pose" json:"pose,omitempty"`
}

func (m *PoseStamped) Reset()                    { *m = PoseStamped{} }
func (m *PoseStamped) String() string            { return proto.CompactTextString(m) }
func (*PoseStamped) ProtoMessage()               {}
func (*PoseStamped) Descriptor() ([]byte, []int) { return fileDescriptor6, []int{0} }

func (m *PoseStamped) GetHeader() *Header {
	if m != nil {
		return m.Header
	}
	return nil
}

func (m *PoseStamped) GetPose() *Pose {
	if m != nil {
		return m.Pose
	}
	return nil
}

type PoseWithCovarianceStamped struct {
	Header *Header             `protobuf:"bytes,1,opt,name=header" json:"header,omitempty"`
	Pose   *PoseWithCovariance `protobuf:"bytes,2,opt,name=pose" json:"pose,omitempty"`
}

func (m *PoseWithCovarianceStamped) Reset()                    { *m = PoseWithCovarianceStamped{} }
func (m *PoseWithCovarianceStamped) String() string            { return proto.CompactTextString(m) }
func (*PoseWithCovarianceStamped) ProtoMessage()               {}
func (*PoseWithCovarianceStamped) Descriptor() ([]byte, []int) { return fileDescriptor6, []int{1} }

func (m *PoseWithCovarianceStamped) GetHeader() *Header {
	if m != nil {
		return m.Header
	}
	return nil
}

func (m *PoseWithCovarianceStamped) GetPose() *PoseWithCovariance {
	if m != nil {
		return m.Pose
	}
	return nil
}

type Pose2DStamped struct {
	Header *Header `protobuf:"bytes,1,opt,name=header" json:"header,omitempty"`
	Pose   *Pose2D `protobuf:"bytes,2,opt,name=pose" json:"pose,omitempty"`
}

func (m *Pose2DStamped) Reset()                    { *m = Pose2DStamped{} }
func (m *Pose2DStamped) String() string            { return proto.CompactTextString(m) }
func (*Pose2DStamped) ProtoMessage()               {}
func (*Pose2DStamped) Descriptor() ([]byte, []int) { return fileDescriptor6, []int{2} }

func (m *Pose2DStamped) GetHeader() *Header {
	if m != nil {
		return m.Header
	}
	return nil
}

func (m *Pose2DStamped) GetPose() *Pose2D {
	if m != nil {
		return m.Pose
	}
	return nil
}

type Pose struct {
	Position    *Point      `protobuf:"bytes,1,opt,name=position" json:"position,omitempty"`
	Orientation *Quaternion `protobuf:"bytes,2,opt,name=orientation" json:"orientation,omitempty"`
}

func (m *Pose) Reset()                    { *m = Pose{} }
func (m *Pose) String() string            { return proto.CompactTextString(m) }
func (*Pose) ProtoMessage()               {}
func (*Pose) Descriptor() ([]byte, []int) { return fileDescriptor6, []int{3} }

func (m *Pose) GetPosition() *Point {
	if m != nil {
		return m.Position
	}
	return nil
}

func (m *Pose) GetOrientation() *Quaternion {
	if m != nil {
		return m.Orientation
	}
	return nil
}

type PoseArray struct {
	Header *Header `protobuf:"bytes,1,opt,name=header" json:"header,omitempty"`
	Poses  []*Pose `protobuf:"bytes,2,rep,name=poses" json:"poses,omitempty"`
}

func (m *PoseArray) Reset()                    { *m = PoseArray{} }
func (m *PoseArray) String() string            { return proto.CompactTextString(m) }
func (*PoseArray) ProtoMessage()               {}
func (*PoseArray) Descriptor() ([]byte, []int) { return fileDescriptor6, []int{4} }

func (m *PoseArray) GetHeader() *Header {
	if m != nil {
		return m.Header
	}
	return nil
}

func (m *PoseArray) GetPoses() []*Pose {
	if m != nil {
		return m.Poses
	}
	return nil
}

type Pose2D struct {
	X     *Float64 `protobuf:"bytes,1,opt,name=x" json:"x,omitempty"`
	Y     *Float64 `protobuf:"bytes,2,opt,name=y" json:"y,omitempty"`
	Theta *Float64 `protobuf:"bytes,3,opt,name=theta" json:"theta,omitempty"`
}

func (m *Pose2D) Reset()                    { *m = Pose2D{} }
func (m *Pose2D) String() string            { return proto.CompactTextString(m) }
func (*Pose2D) ProtoMessage()               {}
func (*Pose2D) Descriptor() ([]byte, []int) { return fileDescriptor6, []int{5} }

func (m *Pose2D) GetX() *Float64 {
	if m != nil {
		return m.X
	}
	return nil
}

func (m *Pose2D) GetY() *Float64 {
	if m != nil {
		return m.Y
	}
	return nil
}

func (m *Pose2D) GetTheta() *Float64 {
	if m != nil {
		return m.Theta
	}
	return nil
}

type PoseWithCovariance struct {
	Pose       *Pose      `protobuf:"bytes,1,opt,name=pose" json:"pose,omitempty"`
	Covariance []*Float64 `protobuf:"bytes,2,rep,name=covariance" json:"covariance,omitempty"`
}

func (m *PoseWithCovariance) Reset()                    { *m = PoseWithCovariance{} }
func (m *PoseWithCovariance) String() string            { return proto.CompactTextString(m) }
func (*PoseWithCovariance) ProtoMessage()               {}
func (*PoseWithCovariance) Descriptor() ([]byte, []int) { return fileDescriptor6, []int{6} }

func (m *PoseWithCovariance) GetPose() *Pose {
	if m != nil {
		return m.Pose
	}
	return nil
}

func (m *PoseWithCovariance) GetCovariance() []*Float64 {
	if m != nil {
		return m.Covariance
	}
	return nil
}

func init() {
	proto.RegisterType((*PoseStamped)(nil), "choreo.PoseStamped")
	proto.RegisterType((*PoseWithCovarianceStamped)(nil), "choreo.PoseWithCovarianceStamped")
	proto.RegisterType((*Pose2DStamped)(nil), "choreo.Pose2DStamped")
	proto.RegisterType((*Pose)(nil), "choreo.Pose")
	proto.RegisterType((*PoseArray)(nil), "choreo.PoseArray")
	proto.RegisterType((*Pose2D)(nil), "choreo.Pose2D")
	proto.RegisterType((*PoseWithCovariance)(nil), "choreo.PoseWithCovariance")
}

func init() { proto.RegisterFile("geometric/pose.proto", fileDescriptor6) }

var fileDescriptor6 = []byte{
	// 387 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x94, 0x92, 0x4f, 0x6b, 0xdb, 0x40,
	0x10, 0xc5, 0x91, 0xff, 0x88, 0x76, 0x5c, 0xbb, 0xb0, 0xb4, 0x45, 0x15, 0x14, 0x8c, 0xa0, 0xa5,
	0xa6, 0x54, 0x02, 0xd7, 0xf4, 0xd2, 0x53, 0x5b, 0x13, 0x72, 0x4c, 0xe4, 0x83, 0x21, 0x39, 0xad,
	0xe5, 0x8d, 0xb4, 0x90, 0xd5, 0x28, 0xbb, 0x6b, 0x63, 0x7f, 0xfb, 0xb0, 0x5a, 0x49, 0x96, 0x51,
	0x72, 0xf0, 0x71, 0xe7, 0xbd, 0x7d, 0xbf, 0x19, 0x66, 0xe0, 0x43, 0xca, 0x50, 0x30, 0x2d, 0x79,
	0x12, 0x15, 0xa8, 0x58, 0x58, 0x48, 0xd4, 0x48, 0xdc, 0x24, 0x43, 0xc9, 0xd0, 0xff, 0x54, 0x48,
	0x2e, 0xb8, 0xe6, 0x7b, 0x16, 0x65, 0x8c, 0x6e, 0x99, 0xb4, 0xba, 0xff, 0xf1, 0x54, 0x7f, 0x78,
	0x44, 0xaa, 0xeb, 0x72, 0x3b, 0x8c, 0xe7, 0x75, 0xd9, 0x3f, 0x95, 0x9f, 0x76, 0x54, 0x33, 0x99,
	0x73, 0xcc, 0xad, 0x16, 0xac, 0x61, 0x74, 0x83, 0x8a, 0xad, 0x34, 0x15, 0x05, 0xdb, 0x92, 0x6f,
	0xe0, 0x5a, 0x90, 0xe7, 0x4c, 0x9d, 0xef, 0xa3, 0xf9, 0x24, 0xb4, 0x9d, 0x84, 0xd7, 0x65, 0x35,
	0xae, 0x54, 0x32, 0x85, 0x81, 0x69, 0xd7, 0xeb, 0x95, 0xae, 0x77, 0xb5, 0xcb, 0x44, 0xc5, 0xa5,
	0x12, 0x28, 0xf8, 0x6c, 0x5e, 0x6b, 0xae, 0xb3, 0xff, 0xb8, 0xa7, 0x92, 0xd3, 0x3c, 0xb9, 0x18,
	0x13, 0x9e, 0x61, 0xfc, 0x36, 0xe6, 0x3c, 0xb8, 0x82, 0xde, 0xc3, 0xd8, 0x68, 0xf3, 0xe5, 0xa5,
	0xa0, 0xe0, 0x0c, 0x34, 0x69, 0x83, 0xe6, 0xcb, 0x2a, 0x3c, 0x85, 0x81, 0x79, 0x93, 0x19, 0xbc,
	0x29, 0x50, 0x71, 0xcd, 0x31, 0xaf, 0x52, 0xc7, 0x27, 0x3f, 0xcf, 0x75, 0xdc, 0xc8, 0x64, 0x01,
	0x23, 0x94, 0x9c, 0xe5, 0x9a, 0x96, 0x6e, 0x9b, 0x4e, 0x6a, 0xf7, 0x6d, 0xb3, 0x8c, 0xb8, 0x6d,
	0x0b, 0xd6, 0xf0, 0xd6, 0x80, 0xfe, 0x4a, 0x49, 0x8f, 0x17, 0x4c, 0x30, 0x34, 0x5d, 0x2a, 0xaf,
	0x37, 0xed, 0x77, 0x56, 0x62, 0xa5, 0x40, 0x80, 0x6b, 0x27, 0x22, 0x5f, 0xc0, 0x39, 0x54, 0x81,
	0xef, 0x6b, 0xe7, 0x95, 0xb9, 0xa4, 0xdf, 0x8b, 0xd8, 0x39, 0x18, 0xf9, 0x58, 0x75, 0xdb, 0x95,
	0x8f, 0xe4, 0x2b, 0x0c, 0x75, 0xc6, 0x34, 0xf5, 0xfa, 0x2f, 0x5b, 0xac, 0x1a, 0xa4, 0x40, 0xba,
	0x9b, 0x6a, 0x4e, 0xc7, 0x79, 0xed, 0x74, 0x48, 0x04, 0x90, 0x34, 0xfe, 0x6a, 0x9e, 0x0e, 0xa3,
	0x65, 0xf9, 0xf7, 0xe3, 0x6e, 0x96, 0x72, 0x9d, 0xed, 0x36, 0x61, 0x82, 0x22, 0x8a, 0x71, 0x83,
	0x7a, 0xa5, 0x77, 0x5b, 0x8e, 0x91, 0xfd, 0xf4, 0x53, 0xa8, 0x34, 0x12, 0x2a, 0xfd, 0x23, 0x54,
	0xba, 0x71, 0xcb, 0xc3, 0xff, 0xf5, 0x1c, 0x00, 0x00, 0xff, 0xff, 0xfd, 0xb2, 0xee, 0x54, 0x7a,
	0x03, 0x00, 0x00,
}