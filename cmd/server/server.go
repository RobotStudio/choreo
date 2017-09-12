package main

//go:generate ../../regen.sh

import (
  "log"
  "net"

  "golang.org/x/net/context"
  "google.golang.org/grpc"
  //"github.com/RobotStudio/choreo-msg/build/primitive"
  "github.com/RobotStudio/choreo-svc/svc"
  msg "github.com/RobotStudio/choreo-msg/msg/primitive"
  "google.golang.org/grpc/reflection"
)

const (
  port = ":5001"
)

type pinger struct {}

func (p* pinger) Ping(ctx context.Context, b *msg.Bool) (*msg.Bool, error) {
  return b, nil
}

func main() {
  lis, err := net.Listen("tcp", port)
  if err != nil {
    log.Fatalf("failed to listen: %v", err)
  }

  s := grpc.NewServer()
  svc.RegisterPingServer(s, &pinger{})

  reflection.Register(s)
  if err := s.Serve(lis); err != nil {
    log.Fatalf("failed to serve: %v", err)
  }
}
