#!/bin/bash

function createSeller() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/seller.pnu.cse/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/seller.pnu.cse/

  # set -x
  fabric-ca-client enroll -u http://admin:adminpw@localhost:7054 --caname ca-seller --tls.certfiles "${PWD}/organizations/fabric-ca/seller/ca-cert.pem"
  # { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-seller.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-seller.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-seller.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-seller.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/seller.pnu.cse/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy seller's CA cert to seller's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/seller.pnu.cse/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/seller/ca-cert.pem" "${PWD}/organizations/peerOrganizations/seller.pnu.cse/msp/tlscacerts/ca.crt"

  # Copy seller's CA cert to seller's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/seller.pnu.cse/tlsca"
  cp "${PWD}/organizations/fabric-ca/seller/ca-cert.pem" "${PWD}/organizations/peerOrganizations/seller.pnu.cse/tlsca/tlsca.seller.pnu.cse-cert.pem"

  # Copy seller's CA cert to seller's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/seller.pnu.cse/ca"
  cp "${PWD}/organizations/fabric-ca/seller/ca-cert.pem" "${PWD}/organizations/peerOrganizations/seller.pnu.cse/ca/ca.seller.pnu.cse-cert.pem"

  infoln "Registering peer0"
  # set -x
  fabric-ca-client register --caname ca-seller --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/seller/ca-cert.pem"
  # { set +x; } 2>/dev/null

  infoln "Registering peer1"
  # set -x
  fabric-ca-client register --caname ca-seller --id.name peer1 --id.secret peer1pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/seller/ca-cert.pem"
  # { set +x; } 2>/dev/null

  infoln "Registering user"
  # set -x
  fabric-ca-client register --caname ca-seller --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/seller/ca-cert.pem"
  # { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  # set -x
  fabric-ca-client register --caname ca-seller --id.name selleradmin --id.secret selleradminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/seller/ca-cert.pem"
  # { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  # set -x
  fabric-ca-client enroll -u http://peer0:peer0pw@localhost:7054 --caname ca-seller -M "${PWD}/organizations/peerOrganizations/seller.pnu.cse/peers/peer0.seller.pnu.cse/msp" --csr.hosts peer0.seller.pnu.cse --tls.certfiles "${PWD}/organizations/fabric-ca/seller/ca-cert.pem"
  # { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/seller.pnu.cse/msp/config.yaml" "${PWD}/organizations/peerOrganizations/seller.pnu.cse/peers/peer0.seller.pnu.cse/msp/config.yaml"

  infoln "Generating the peer1 msp"
  # set -x
  fabric-ca-client enroll -u http://peer1:peer1pw@localhost:7054 --caname ca-seller -M "${PWD}/organizations/peerOrganizations/seller.pnu.cse/peers/peer1.seller.pnu.cse/msp" --csr.hosts peer1.seller.pnu.cse --tls.certfiles "${PWD}/organizations/fabric-ca/seller/ca-cert.pem"
  # { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/seller.pnu.cse/msp/config.yaml" "${PWD}/organizations/peerOrganizations/seller.pnu.cse/peers/peer1.seller.pnu.cse/msp/config.yaml"


  infoln "Generating the peer0-tls certificates"
  # set -x
  fabric-ca-client enroll -u http://peer0:peer0pw@localhost:7054 --caname ca-seller -M "${PWD}/organizations/peerOrganizations/seller.pnu.cse/peers/peer0.seller.pnu.cse/tls" --enrollment.profile tls --csr.hosts peer0.seller.pnu.cse --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/seller/ca-cert.pem"
  # { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/seller.pnu.cse/peers/peer0.seller.pnu.cse/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/seller.pnu.cse/peers/peer0.seller.pnu.cse/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/seller.pnu.cse/peers/peer0.seller.pnu.cse/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/seller.pnu.cse/peers/peer0.seller.pnu.cse/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/seller.pnu.cse/peers/peer0.seller.pnu.cse/tls/keystore/"* "${PWD}/organizations/peerOrganizations/seller.pnu.cse/peers/peer0.seller.pnu.cse/tls/server.key"

  infoln "Generating the peer1-tls certificates"
  # set -x
  fabric-ca-client enroll -u http://peer1:peer1pw@localhost:7054 --caname ca-seller -M "${PWD}/organizations/peerOrganizations/seller.pnu.cse/peers/peer1.seller.pnu.cse/tls" --enrollment.profile tls --csr.hosts peer1.seller.pnu.cse --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/seller/ca-cert.pem"
  # { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/seller.pnu.cse/peers/peer1.seller.pnu.cse/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/seller.pnu.cse/peers/peer1.seller.pnu.cse/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/seller.pnu.cse/peers/peer1.seller.pnu.cse/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/seller.pnu.cse/peers/peer1.seller.pnu.cse/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/seller.pnu.cse/peers/peer1.seller.pnu.cse/tls/keystore/"* "${PWD}/organizations/peerOrganizations/seller.pnu.cse/peers/peer1.seller.pnu.cse/tls/server.key"


  infoln "Generating the user msp"
  # set -x
  fabric-ca-client enroll -u http://user1:user1pw@localhost:7054 --caname ca-seller -M "${PWD}/organizations/peerOrganizations/seller.pnu.cse/users/User1@seller.pnu.cse/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/seller/ca-cert.pem"
  # { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/seller.pnu.cse/msp/config.yaml" "${PWD}/organizations/peerOrganizations/seller.pnu.cse/users/User1@seller.pnu.cse/msp/config.yaml"

  infoln "Generating the org admin msp"
  # set -x
  fabric-ca-client enroll -u http://selleradmin:selleradminpw@localhost:7054 --caname ca-seller -M "${PWD}/organizations/peerOrganizations/seller.pnu.cse/users/Admin@seller.pnu.cse/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/seller/ca-cert.pem"
  # { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/seller.pnu.cse/msp/config.yaml" "${PWD}/organizations/peerOrganizations/seller.pnu.cse/users/Admin@seller.pnu.cse/msp/config.yaml"
}

function createBuyer() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/buyer.pnu.cse/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/buyer.pnu.cse/

  # set -x
  fabric-ca-client enroll -u http://admin:adminpw@localhost:8054 --caname ca-buyer --tls.certfiles "${PWD}/organizations/fabric-ca/buyer/ca-cert.pem"
  # { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-buyer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-buyer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-buyer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-buyer.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy buyer's CA cert to buyer's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/buyer/ca-cert.pem" "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/msp/tlscacerts/ca.crt"

  # Copy buyer's CA cert to buyer's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/tlsca"
  cp "${PWD}/organizations/fabric-ca/buyer/ca-cert.pem" "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/tlsca/tlsca.buyer.pnu.cse-cert.pem"

  # Copy buyer's CA cert to buyer's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/ca"
  cp "${PWD}/organizations/fabric-ca/buyer/ca-cert.pem" "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/ca/ca.buyer.pnu.cse-cert.pem"

  infoln "Registering peer0"
  # set -x
  fabric-ca-client register --caname ca-buyer --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/buyer/ca-cert.pem"
  # { set +x; } 2>/dev/null

  infoln "Registering peer1"
  # set -x
  fabric-ca-client register --caname ca-buyer --id.name peer1 --id.secret peer1pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/buyer/ca-cert.pem"
  # { set +x; } 2>/dev/null

  infoln "Registering user"
  # set -x
  fabric-ca-client register --caname ca-buyer --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/buyer/ca-cert.pem"
  # { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  # set -x
  fabric-ca-client register --caname ca-buyer --id.name buyeradmin --id.secret buyeradminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/buyer/ca-cert.pem"
  # { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  # set -x
  fabric-ca-client enroll -u http://peer0:peer0pw@localhost:8054 --caname ca-buyer -M "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/peers/peer0.buyer.pnu.cse/msp" --csr.hosts peer0.buyer.pnu.cse --tls.certfiles "${PWD}/organizations/fabric-ca/buyer/ca-cert.pem"
  # { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/msp/config.yaml" "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/peers/peer0.buyer.pnu.cse/msp/config.yaml"

  infoln "Generating the peer1 msp"
  # set -x
  fabric-ca-client enroll -u http://peer1:peer1pw@localhost:8054 --caname ca-buyer -M "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/peers/peer1.buyer.pnu.cse/msp" --csr.hosts peer1.buyer.pnu.cse --tls.certfiles "${PWD}/organizations/fabric-ca/buyer/ca-cert.pem"
  # { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/msp/config.yaml" "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/peers/peer1.buyer.pnu.cse/msp/config.yaml"


  infoln "Generating the peer0-tls certificates"
  set -x
  fabric-ca-client enroll -u http://peer0:peer0pw@localhost:8054 --caname ca-buyer -M "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/peers/peer0.buyer.pnu.cse/tls" --enrollment.profile tls --csr.hosts peer0.buyer.pnu.cse --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/buyer/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/peers/peer0.buyer.pnu.cse/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/peers/peer0.buyer.pnu.cse/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/peers/peer0.buyer.pnu.cse/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/peers/peer0.buyer.pnu.cse/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/peers/peer0.buyer.pnu.cse/tls/keystore/"* "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/peers/peer0.buyer.pnu.cse/tls/server.key"

  infoln "Generating the peer1-tls certificates"
  # set -x
  fabric-ca-client enroll -u http://peer1:peer1pw@localhost:8054 --caname ca-buyer -M "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/peers/peer1.buyer.pnu.cse/tls" --enrollment.profile tls --csr.hosts peer1.buyer.pnu.cse --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/buyer/ca-cert.pem"
  # { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/peers/peer1.buyer.pnu.cse/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/peers/peer1.buyer.pnu.cse/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/peers/peer1.buyer.pnu.cse/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/peers/peer1.buyer.pnu.cse/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/peers/peer1.buyer.pnu.cse/tls/keystore/"* "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/peers/peer1.buyer.pnu.cse/tls/server.key"

  infoln "Generating the user msp"
  # set -x
  fabric-ca-client enroll -u http://user1:user1pw@localhost:8054 --caname ca-buyer -M "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/users/User1@buyer.pnu.cse/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/buyer/ca-cert.pem"
  # { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/msp/config.yaml" "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/users/User1@buyer.pnu.cse/msp/config.yaml"

  infoln "Generating the org admin msp"
  # set -x
  fabric-ca-client enroll -u http://buyeradmin:buyeradminpw@localhost:8054 --caname ca-buyer -M "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/users/Admin@buyer.pnu.cse/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/buyer/ca-cert.pem"
  # { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/msp/config.yaml" "${PWD}/organizations/peerOrganizations/buyer.pnu.cse/users/Admin@buyer.pnu.cse/msp/config.yaml"
}

function createInspector {
	infoln "Enrolling the CA admin"
	mkdir -p organizations/peerOrganizations/inspector.pnu.cse/

	export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/inspector.pnu.cse/

  # set -x
  fabric-ca-client enroll -u http://admin:adminpw@localhost:11054 --caname ca-inspector --tls.certfiles ${PWD}/organizations/fabric-ca/inspector/ca-cert.pem
  # { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-inspector.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-inspector.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-inspector.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-inspector.pem
    OrganizationalUnitIdentifier: orderer' > ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/msp/config.yaml

	infoln "Registering peer0"
  # set -x
	fabric-ca-client register --caname ca-inspector --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles ${PWD}/organizations/fabric-ca/inspector/tls-cert.pem
  # { set +x; } 2>/dev/null

  infoln "Registering peer1"
  # set -x
  fabric-ca-client register --caname ca-inspector --id.name peer1 --id.secret peer1pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/inspector/ca-cert.pem"
  # { set +x; } 2>/dev/null

  infoln "Registering user"
  # set -x
  fabric-ca-client register --caname ca-inspector --id.name user1 --id.secret user1pw --id.type client --tls.certfiles ${PWD}/organizations/fabric-ca/inspector/tls-cert.pem
  # { set +x; } 2>/dev/null

  infoln "Registering the org admin"
  # set -x
  fabric-ca-client register --caname ca-inspector --id.name inspectoradmin --id.secret inspectoradminpw --id.type admin --tls.certfiles ${PWD}/organizations/fabric-ca/inspector/tls-cert.pem
  # { set +x; } 2>/dev/null

  infoln "Generating the peer0 msp"
  # set -x
	fabric-ca-client enroll -u http://peer0:peer0pw@localhost:11054 --caname ca-inspector -M ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer0.inspector.pnu.cse/msp --csr.hosts peer0.inspector.pnu.cse --tls.certfiles ${PWD}/organizations/fabric-ca/inspector/tls-cert.pem
  # { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/msp/config.yaml ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer0.inspector.pnu.cse/msp/config.yaml

  infoln "Generating the peer1 msp"
  # set -x
  fabric-ca-client enroll -u http://peer1:peer1pw@localhost:11054 --caname ca-inspector -M "${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer1.inspector.pnu.cse/msp" --csr.hosts peer1.inspector.pnu.cse --tls.certfiles "${PWD}/organizations/fabric-ca/inspector/ca-cert.pem"
  # { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/inspector.pnu.cse/msp/config.yaml" "${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer1.inspector.pnu.cse/msp/config.yaml"

  infoln "Generating the peer0-tls certificates"
  # set -x
  fabric-ca-client enroll -u http://peer0:peer0pw@localhost:11054 --caname ca-inspector -M ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer0.inspector.pnu.cse/tls --enrollment.profile tls --csr.hosts peer0.inspector.pnu.cse --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/inspector/tls-cert.pem
  # { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer0.inspector.pnu.cse/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer0.inspector.pnu.cse/tls/ca.crt
  cp ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer0.inspector.pnu.cse/tls/signcerts/* ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer0.inspector.pnu.cse/tls/server.crt
  cp ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer0.inspector.pnu.cse/tls/keystore/* ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer0.inspector.pnu.cse/tls/server.key

  mkdir ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/msp/tlscacerts
  cp ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer0.inspector.pnu.cse/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/msp/tlscacerts/ca.crt

  mkdir ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/tlsca
  cp ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer0.inspector.pnu.cse/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/tlsca/tlsca.inspector.pnu.cse-cert.pem

  mkdir ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/ca
  cp ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer0.inspector.pnu.cse/msp/cacerts/* ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/ca/ca.inspector.pnu.cse-cert.pem

  infoln "Generating the peer1-tls certificates"
  # set -x
  fabric-ca-client enroll -u http://peer1:peer1pw@localhost:11054 --caname ca-inspector -M ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer1.inspector.pnu.cse/tls --enrollment.profile tls --csr.hosts peer1.inspector.pnu.cse --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/inspector/tls-cert.pem
  # { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer1.inspector.pnu.cse/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer1.inspector.pnu.cse/tls/ca.crt
  cp ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer1.inspector.pnu.cse/tls/signcerts/* ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer1.inspector.pnu.cse/tls/server.crt
  cp ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer1.inspector.pnu.cse/tls/keystore/* ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer1.inspector.pnu.cse/tls/server.key

  mkdir ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/msp/tlscacerts
  cp ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer1.inspector.pnu.cse/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/msp/tlscacerts/ca.crt

  mkdir ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/tlsca
  cp ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer1.inspector.pnu.cse/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/tlsca/tlsca.inspector.pnu.cse-cert.pem

  mkdir ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/ca
  cp ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/peers/peer1.inspector.pnu.cse/msp/cacerts/* ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/ca/ca.inspector.pnu.cse-cert.pem

  
  infoln "Generating the user msp"
  # set -x
	fabric-ca-client enroll -u http://user1:user1pw@localhost:11054 --caname ca-inspector -M ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/users/User1@inspector.pnu.cse/msp --tls.certfiles ${PWD}/organizations/fabric-ca/inspector/tls-cert.pem
  # { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/msp/config.yaml ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/users/User1@inspector.pnu.cse/msp/config.yaml

  infoln "Generating the org admin msp"
  # set -x
	fabric-ca-client enroll -u http://inspectoradmin:inspectoradminpw@localhost:11054 --caname ca-inspector -M ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/users/Admin@inspector.pnu.cse/msp --tls.certfiles ${PWD}/organizations/fabric-ca/inspector/tls-cert.pem
  # { set +x; } 2>/dev/null

  cp ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/msp/config.yaml ${PWD}/organizations/peerOrganizations/inspector.pnu.cse/users/Admin@inspector.pnu.cse/msp/config.yaml
}

function createOrderer() {
  infoln "Enrolling the CA admin"
  mkdir -p organizations/ordererOrganizations/pnu.cse

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/ordererOrganizations/pnu.cse

  # set -x
  fabric-ca-client enroll -u http://admin:adminpw@localhost:9054 --caname ca-orderer --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  # { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/ordererOrganizations/pnu.cse/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy orderer org's CA cert to orderer org's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/ordererOrganizations/pnu.cse/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem" "${PWD}/organizations/ordererOrganizations/pnu.cse/msp/tlscacerts/tlsca.pnu.cse-cert.pem"

  # Copy orderer org's CA cert to orderer org's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/ordererOrganizations/pnu.cse/tlsca"
  cp "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem" "${PWD}/organizations/ordererOrganizations/pnu.cse/tlsca/tlsca.pnu.cse-cert.pem"

  infoln "Registering orderer"
  # set -x
  fabric-ca-client register --caname ca-orderer --id.name orderer --id.secret ordererpw --id.type orderer --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  # { set +x; } 2>/dev/null

  infoln "Registering the orderer admin"
  # set -x
  fabric-ca-client register --caname ca-orderer --id.name ordererAdmin --id.secret ordererAdminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  # { set +x; } 2>/dev/null

  infoln "Generating the orderer msp"
  # set -x
  fabric-ca-client enroll -u http://orderer:ordererpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/pnu.cse/orderers/orderer.pnu.cse/msp" --csr.hosts orderer.pnu.cse --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  # { set +x; } 2>/dev/null

  cp "${PWD}/organizations/ordererOrganizations/pnu.cse/msp/config.yaml" "${PWD}/organizations/ordererOrganizations/pnu.cse/orderers/orderer.pnu.cse/msp/config.yaml"

  infoln "Generating the orderer-tls certificates"
  # set -x
  fabric-ca-client enroll -u http://orderer:ordererpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/pnu.cse/orderers/orderer.pnu.cse/tls" --enrollment.profile tls --csr.hosts orderer.pnu.cse --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  # { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the orderer's tls directory that are referenced by orderer startup config
  cp "${PWD}/organizations/ordererOrganizations/pnu.cse/orderers/orderer.pnu.cse/tls/tlscacerts/"* "${PWD}/organizations/ordererOrganizations/pnu.cse/orderers/orderer.pnu.cse/tls/ca.crt"
  cp "${PWD}/organizations/ordererOrganizations/pnu.cse/orderers/orderer.pnu.cse/tls/signcerts/"* "${PWD}/organizations/ordererOrganizations/pnu.cse/orderers/orderer.pnu.cse/tls/server.crt"
  cp "${PWD}/organizations/ordererOrganizations/pnu.cse/orderers/orderer.pnu.cse/tls/keystore/"* "${PWD}/organizations/ordererOrganizations/pnu.cse/orderers/orderer.pnu.cse/tls/server.key"

  # Copy orderer org's CA cert to orderer's /msp/tlscacerts directory (for use in the orderer MSP definition)
  mkdir -p "${PWD}/organizations/ordererOrganizations/pnu.cse/orderers/orderer.pnu.cse/msp/tlscacerts"
  cp "${PWD}/organizations/ordererOrganizations/pnu.cse/orderers/orderer.pnu.cse/tls/tlscacerts/"* "${PWD}/organizations/ordererOrganizations/pnu.cse/orderers/orderer.pnu.cse/msp/tlscacerts/tlsca.pnu.cse-cert.pem"

  infoln "Generating the admin msp"
  # set -x
  fabric-ca-client enroll -u http://ordererAdmin:ordererAdminpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/pnu.cse/users/Admin@pnu.cse/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  # { set +x; } 2>/dev/null

  cp "${PWD}/organizations/ordererOrganizations/pnu.cse/msp/config.yaml" "${PWD}/organizations/ordererOrganizations/pnu.cse/users/Admin@pnu.cse/msp/config.yaml"
}
