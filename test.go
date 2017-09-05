package main

//go:generate protoc -I ../choreo-msg/msg -I ../choreo-svc/svc --go_out=plugins=grpc:../choreo-svc/build/go ../choreo-svc/svc/ping.proto

import (
  "log"
  "net"

  "golang.org/x/net/context"
  "google.golang.org/grpc"
  "github.com/RobotStudio/choreo-msg/build/go/primitive"
  pb "github.com/RobotStudio/choreo-svc/svc"
  "google.golang.org/grpc/reflection"
)

const (
  port = ":5001"
)

type Pinger struct {}

func (p* Pinger) Ping(ctx context.Context, b Bool) Bool {
  return b
}

func main() {
  lis, err := net.Listen("tcp", port)
  if err != nil {
    log.Fatalf("failed to listen: %v", err)
  }

  s := grpc.NewServer()
  pb.RegisterGreeterServer(s, &server{})

  reflection.Register(s)
  if err := s.Serve(lis); err != nil {
    log.Fatalf("failed to serve: %v", err)
  }
}
