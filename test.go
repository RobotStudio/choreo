package main

//go:generate protoc -I ../choreo-msg/msg -I ../choreo-svc/svc --go_out=plugins=grpc:../choreo-svc/build/go ../choreo-svc/svc/ping.proto

import (
  "log"
  "net"

  "golang.org/x/net/context"
  "google.golang.org/grpc"
  //"github.com/RobotStudio/choreo-msg/build/primitive"
  "github.com/RobotStudio/choreo-svc/svc"
  "github.com/RobotStudio/choreo-msg/msg"
  "google.golang.org/grpc/reflection"
)

const (
  port = ":5001"
)

func (p* svc.PingServer) Ping(ctx context.Context, b msg.Bool) msg.Bool {
  return b
}

func main() {
  lis, err := net.Listen("tcp", port)
  if err != nil {
    log.Fatalf("failed to listen: %v", err)
  }

  s := grpc.NewServer()
  svc.RegisterPingServer(s, &svc.PingServer{})

  reflection.Register(s)
  if err := s.Serve(lis); err != nil {
    log.Fatalf("failed to serve: %v", err)
  }
}
