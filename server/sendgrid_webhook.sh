function localtunnel {
  lt -s alocke12992 --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done